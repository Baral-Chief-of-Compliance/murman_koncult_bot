from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib.auth.views import LogoutView

from feedback_control_app import views

app_name = 'feedback_control_app'


router = DefaultRouter()
router.register(r"civilian_requests", views.CivilianRequestView, basename='civilian_requests')

urlpatterns = [
    path("api/v1.0/", include(router.urls)),
    path('login/', views.AuthenticationFormView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
