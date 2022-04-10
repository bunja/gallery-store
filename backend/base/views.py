from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Painting
# from .paintings import paintings 
from .serializers import PaintingSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Not welcomed you are')

@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

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