from django.contrib.postgres.fields import JSONField
from django.db import models


class Product(models.Model):
    product_id = models.IntegerField(primary_key=True)
    product_name = models.CharField(max_length=100, unique=True)
    mass_g = models.FloatField(default=0.0)
    quantity = models.IntegerField(default=0.0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    date_deleted = models.DateTimeField(blank=True, null=True)


class Order(models.Model):
    order_id = models.IntegerField(primary_key=True)
    requested = JSONField()
    pending = JSONField()
    is_pending = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    date_deleted = models.DateTimeField(blank=True, null=True)


class Shipment(models.Model):
    shipment_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField(default=0)
    shipped = JSONField(blank=False, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    date_deleted = models.DateTimeField(blank=True, null=True)

class Request(models.Model):
    request_id = models.AutoField(primary_key=True)
    requested = JSONField(blank=False, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    date_deleted = models.DateTimeField(blank=True, null=True)
