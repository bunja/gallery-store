
from email.policy import default
from django.db import models
from django.contrib.auth.models import User


class Painting(models.Model):

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    # image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    materials = models.CharField(max_length=200, null=True, blank=True)
    
    height = models.DecimalField(max_digits=7, decimal_places=0, null=True, blank=True)
    width = models.DecimalField(max_digits=7, decimal_places=0, null=True, blank=True)
    year = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    isAvailable = models.BooleanField(default=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Image(models.Model):
    paintingId = models.ForeignKey(Painting, on_delete=models.SET_NULL, null=True)
    imageUrl = models.ImageField(null=True, blank=True, default='/placeholder.png')
    name = models.TextField(null=True, blank=True)
    order = models.IntegerField(null=False, blank=False, default=1)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
    
    class Meta:
        ordering = [ 'order' ]


class Order(models.Model):

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):

    painting = models.ForeignKey(Painting, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):

    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
   
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)

