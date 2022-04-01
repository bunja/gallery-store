from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .paintings import paintings 

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Not welcomed you are')

@api_view(['GET'])
def getPaintings(request):
    return Response(paintings)

@api_view(['GET'])
def getPainting(request, pk):
    painting = None
    for i in paintings:
        if i['_id'] == pk:
            painting = i
            break
    return Response(painting)