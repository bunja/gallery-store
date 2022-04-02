from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Painting
# from .paintings import paintings 
from .serializers import PaintingSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Not welcomed you are')

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