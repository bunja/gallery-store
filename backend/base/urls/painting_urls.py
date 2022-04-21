from django.urls import path
from base.views import painting_views as views

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
        
    path('', views.getPaintings, name='paintings'),
    
    path('create/', views.createPainting, name='painting-create'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('<str:pk>', views.getPainting, name='painting'),
    
    path('update/<str:pk>/', views.updatePainting, name='painting-update'),
    path('delete/<str:pk>/', views.deletePainting, name='painting-delete'),
]