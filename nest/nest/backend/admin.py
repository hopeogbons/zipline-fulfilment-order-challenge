from django.contrib import admin
from nest.backend.models import Product, Order, Shipment

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Shipment)
