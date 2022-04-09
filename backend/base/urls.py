from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('', views.getRoutes, name='routes'),
    path('paintings/', views.getPaintings, name='paintings'),
    path('paintings/<str:pk>', views.getPainting, name='painting'),
]