from django.urls import path, include
from rest_framework.routers import DefaultRouter

from feedback_control_app import views


router = DefaultRouter()
router.register(r"civilian_requests", views.CivilianRequestView, basename='civilian_requests')

urlpatterns = [
    path("api/v1.0/", include(router.urls))
]
