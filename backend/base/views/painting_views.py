from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Painting
from base.serializers import PaintingSerializer
from rest_framework import status

@api_view(['GET'])
def getPaintings(request):
    paintings = Painting.objects.all()
    serializer = PaintingSerializer(paintings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPainting(request, pk):
    painting = Painting.objects.get(_id=pk)
    serializer = PaintingSerializer(painting, many=False)
    return Response(serializer.data)