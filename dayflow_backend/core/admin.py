from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Attendance, LeaveRequest, Payroll

# 1. Custom User Admin (to handle your custom fields like role, phone, etc.)
class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = UserAdmin.fieldsets + (
        ('Dayflow Info', {'fields': ('role', 'employee_id', 'phone', 'department', 'position', 'profile_picture')}),
    )
    list_display = ['username', 'email', 'role', 'department', 'employee_id']
    list_filter = ['role', 'department']

# 2. Register all models
admin.site.register(User, CustomUserAdmin)
admin.site.register(Attendance)
admin.site.register(LeaveRequest)
admin.site.register(Payroll)