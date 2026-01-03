from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'ADMIN'

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        # Check if the object has a 'user' attribute (Attendance, Leave) or is the User itself
        return obj == request.user or getattr(obj, 'user', None) == request.user