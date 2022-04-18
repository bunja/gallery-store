from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Painting, Order, OrderItem, ShippingAddress

from base.serializers import PaintingSerializer, OrderSerializer

from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Oreder Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
            
        )
        
        # create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        # create order items and set order to orderItems relationship
        
        for i in orderItems:
            painting = Painting.objects.get(_id=i['painting'])
            
            item = OrderItem.objects.create(
                painting=painting,
                order=order,
                name=painting.name,
                price=i['price'],
                image=painting.image.url
            )
            # update stock
            painting.isAvailable = False
            painting.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])   
def getOrderById(request, pk):
    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)