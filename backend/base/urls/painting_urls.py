from django.urls import path
from base.views import painting_views as views

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
        
    path('', views.getPaintings, name='paintings'),
    path('<str:pk>', views.getPainting, name='painting'),
]