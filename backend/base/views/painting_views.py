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

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPainting(request):
    user = request.user
    painting = Painting.objects.create(
        user=user,
        name='Sample Name',
        price = 0,
        height = 0,
        width = 0,
        isAvailable = True,
        materials='Sample Materials',
        description=''
        
    )
    serializer = PaintingSerializer(painting, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updatePainting(request, pk):
    data = request.data
    painting = Painting.objects.get(_id=pk)
    
    painting.name = data['name']
    painting.price = data['price']
    painting.height = data['height']
    painting.width = data['width']
    painting.isAvailable = data['isAvailable']
    painting.materials = data['materials']
    painting.description = data['description']
    
    painting.save()
    
    serializer = PaintingSerializer(painting, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePainting(request, pk):
    painting = Painting.objects.get(_id=pk)
    painting.delete()
    
    return Response("This trash pic was deleted")