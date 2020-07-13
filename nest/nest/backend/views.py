import json
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.utils.decorators import method_decorator
from nest.backend.models import Product, Order, Shipment
from nest.backend.serializers import ProductSerializer, OrderSerializer, ShipmentSerializer
from nest.backend.services import NestService, ProductService, OrderService, ShipmentService, RequestService


class NestViewSet(viewsets.ModelViewSet):
    def create(self, request):
        product_info = json.loads(request.POST.get("product_info"))
        product_list = NestService.init_catalog(product_info)

        return Response(product_list, status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-date_created')
    serializer_class = ProductSerializer

    def patch(self, request):
        restock = json.loads(request.POST.get("restock"))
        restock_list = ProductService.process_restock(restock)

        return Response(restock_list, status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-date_created')
    serializer_class = OrderSerializer

    def create(self, request):
        order = json.loads(request.POST.get("order"))
        order_info = OrderService.process_order(order)

        return Response(order_info, status=status.HTTP_200_OK)


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all().order_by('-date_created')
    serializer_class = ShipmentSerializer

    def create(self, request):
        shipment = json.loads(request.POST.get("shipment"))
        shipment_info = ShipmentService.ship_package(shipment)

        return Response(shipment_info, status=status.HTTP_200_OK)


class RequestViewSet(viewsets.ModelViewSet):
    def patch(self, request):
        order = json.loads(request.POST.get("order"))
        order_list = RequestService.process_request(order)

        return Response(order_list, status=status.HTTP_200_OK)
