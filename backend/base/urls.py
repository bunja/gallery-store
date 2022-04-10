from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('users/profile', views.getUserProfile, name='users - profile'),
    path('users/', views.getUsers, name='users'),
    
    path('paintings/', views.getPaintings, name='paintings'),
    path('paintings/<str:pk>', views.getPainting, name='painting'),
]