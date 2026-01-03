from rest_framework import serializers
from .models import User, Attendance, LeaveRequest, Payroll

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'employee_id', 'phone', 'address', 'department', 'position', 'profile_picture']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'
        read_only_fields = ['user', 'date']

class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = '__all__'
        read_only_fields = ['user', 'status', 'admin_remarks']

# Admin serializer to update leave status
class LeaveStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['status', 'admin_remarks']

class PayrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = '__all__'

# Add this to core/serializers.py

class HRSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Fields for the 2-step signup process
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'company_name', 'employee_id']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Force the role to ADMIN for anyone using this signup form
        validated_data['role'] = 'ADMIN' 
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user