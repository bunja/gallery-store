from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Painting, Image
from base.serializers import PaintingSerializer
from rest_framework import status



@api_view(['GET'])
def getPaintings(request):
    query = request.query_params.get('keyword')
    print('QUERY====>', query)
    if query == None:
        query = ''
    paintings = Painting.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(paintings, 5)
    
    try:
        paintings = paginator.page(page)
    except PageNotAnInteger:
        paintings = paginator.page(1)
    except EmptyPage:
        paintings = paginator.page(paginator.num_pages)
        
    if page == None:
        page = 1
        
    page = int(page)
    
    serializer = PaintingSerializer(paintings, many=True)
    return Response({
        'paintings': serializer.data,
        'page': page,
        'pages': paginator.num_pages,
        })

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
        year = 2000,
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
    painting.year = data['year']
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

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    
    painting_id = data['painting_id']
    painting = Painting.objects.get(_id=painting_id)
    
    painting.image = request.FILES.get('image')
    painting.save()
    return Response('Image was uploaded')
