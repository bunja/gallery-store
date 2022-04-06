from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Painting

class PaintingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Painting
        fields = '__all__'