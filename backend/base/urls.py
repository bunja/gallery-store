from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('paintings/', views.getPaintings, name='paintings'),
    path('paintings/<str:pk>', views.getPainting, name='painting'),
]