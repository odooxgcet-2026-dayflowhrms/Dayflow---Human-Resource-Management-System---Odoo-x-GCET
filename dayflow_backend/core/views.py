# Add these to the top of core/views.py
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from .models import User, Attendance, LeaveRequest, Payroll
from .serializers import *
from .permissions import IsAdminUser, IsOwnerOrAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']: # Only Admin can delete/create users directly
            return [permissions.IsAuthenticated(), IsAdminUser()]
        return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]

    def get_queryset(self):
        # Employees only see themselves; Admins see everyone
        if self.request.user.role == 'ADMIN':
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return Attendance.objects.all()
        return Attendance.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def check_in(self, request):
        today = timezone.now().date()
        if Attendance.objects.filter(user=request.user, date=today).exists():
            return Response({"error": "Already checked in today"}, status=400)
        
        Attendance.objects.create(
            user=request.user, 
            date=today, 
            check_in=timezone.now().time(), 
            status='PRESENT'
        )
        return Response({"message": "Checked in successfully"})

    @action(detail=False, methods=['post'])
    def check_out(self, request):
        today = timezone.now().date()
        try:
            attendance = Attendance.objects.get(user=request.user, date=today)
            attendance.check_out = timezone.now().time()
            attendance.save()
            return Response({"message": "Checked out successfully"})
        except Attendance.DoesNotExist:
            return Response({"error": "No check-in record found for today"}, status=400)

class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return LeaveRequest.objects.all()
        return LeaveRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Custom action for Admin to approve/reject
    @action(detail=True, methods=['patch'], permission_classes=[IsAdminUser])
    def review(self, request, pk=None):
        leave = self.get_object()
        serializer = LeaveStatusSerializer(leave, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class PayrollViewSet(viewsets.ModelViewSet):
    serializer_class = PayrollSerializer
    
    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return Payroll.objects.all()
        return Payroll.objects.filter(user=self.request.user)

class HRSignupView(CreateAPIView):
    serializer_class = HRSignupSerializer
    permission_classes = [AllowAny] # Anyone can access the signup page