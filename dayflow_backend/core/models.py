from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin/HR'),
        ('EMPLOYEE', 'Employee'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='EMPLOYEE')
    employee_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    department = models.CharField(max_length=50, blank=True)
    position = models.CharField(max_length=50, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True) # New Field

    def __str__(self):
        return f"{self.username} ({self.role})"

    def save(self, *args, **kwargs):
        # Auto-generate Employee ID for new EMPLOYEE users
        if not self.pk and self.role == 'EMPLOYEE':
            # Get initials and year
            company_initials = "".join([word[0].upper() for word in self.company_name.split()])[:3] if self.company_name else "UNK"
            first_name_initials = self.first_name[:2].upper() if self.first_name else "XX"
            last_name_initials = self.last_name[:2].upper() if self.last_name else "XX"
            year = timezone.now().strftime("%Y")
            # Get serial number (count existing employees + 1)
            serial_no = User.objects.filter(role='EMPLOYEE').count() + 1
            self.employee_id = f"{company_initials}{first_name_initials}{last_name_initials}{year}{serial_no:03d}"

        super().save(*args, **kwargs)

# ... (Attendance, LeaveRequest, Payroll models remain the same as before)
# Paste them here from your previous code
class Attendance(models.Model):
    STATUS_CHOICES = (
        ('PRESENT', 'Present'),
        ('ABSENT', 'Absent'),
        ('HALF_DAY', 'Half-day'),
        ('LEAVE', 'Leave'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendance')
    date = models.DateField(default=timezone.now)
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ABSENT')

    class Meta:
        unique_together = ('user', 'date')

class LeaveRequest(models.Model):
    LEAVE_TYPES = (
        ('PAID', 'Paid Leave'),
        ('SICK', 'Sick Leave'),
        ('UNPAID', 'Unpaid Leave'),
    )
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    admin_remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Payroll(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payroll')
    salary_month = models.DateField(help_text="First day of the month")
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    
    def save(self, *args, **kwargs):
        self.net_salary = self.basic_salary + self.allowances - self.deductions
        super().save(*args, **kwargs)