# dayflow_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Import HRSignupView here
from core.views import UserViewSet, AttendanceViewSet, LeaveViewSet, PayrollViewSet, HRSignupView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'leaves', LeaveViewSet, basename='leaves')
router.register(r'payroll', PayrollViewSet, basename='payroll')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # Add the new signup URL here
    path('api/auth/signup/', HRSignupView.as_view(), name='hr_signup'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)