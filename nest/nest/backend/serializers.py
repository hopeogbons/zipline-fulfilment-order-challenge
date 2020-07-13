from nest.backend.models import Product, Order, Shipment
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id', 'product_name', 'mass_g', 'quantity', 'date_created', 'date_updated', 'date_deleted')


class OrderSerializer(serializers.ModelSerializer):
    order_count = serializers.SerializerMethodField()
    pending_count = serializers.SerializerMethodField()
    order_list = serializers.SerializerMethodField()
    pending_list = serializers.SerializerMethodField()

    def get_order_count(self, obj):
        count = 0
        for item in obj.requested:
            count += item['quantity']
        return count

    def get_pending_count(self, obj):
        count = 0
        for item in obj.pending:
            count += item['quantity']
        return count

    def get_order_list(self, obj):
        order_keys = []
        order_list = []
        for item in obj.requested:
            order_keys.append(item['product_id'])
            order_list.append({'product_id': item['product_id'],
                               'product_name': '',
                               'quantity': item['quantity']})
        product_dict = Product.objects.in_bulk(order_keys)
        for order in order_list:
            order['product_name'] = product_dict[order['product_id']].product_name
        print(order_list)
        return order_list

    def get_pending_list(self, obj):
        pending_keys = []
        pending_list = []
        for item in obj.pending:
            pending_keys.append(item['product_id'])
            pending_list.append({'product_id': item['product_id'],
                               'product_name': '',
                               'quantity': item['quantity']})
        product_dict = Product.objects.in_bulk(pending_keys)
        for pending in pending_list:
            pending['product_name'] = product_dict[pending['product_id']].product_name
        print(pending_list)
        return pending_list

    class Meta:
        model = Order
        fields = ('order_id', 'requested', 'pending', 'order_count', 'pending_count', 'pending_list', 'order_list', 'is_pending', 'date_created', 'date_updated', 'date_deleted')


class ShipmentSerializer(serializers.ModelSerializer):
    shipment_count = serializers.SerializerMethodField()
    shipping_list = serializers.SerializerMethodField()

    def get_shipment_count(self, obj):
        count = 0
        for item in obj.shipped:
            count += item['quantity']
        return count

    def get_shipping_list(self, obj):
        order_keys = []
        order_list = []
        for item in obj.shipped:
            order_keys.append(item['product_id'])
            order_list.append({'product_id': item['product_id'],
                               'product_name': '',
                               'quantity': item['quantity']})
        product_dict = Product.objects.in_bulk(order_keys)
        for order in order_list:
            order['product_name'] = product_dict[order['product_id']].product_name
        print(order_list)
        return order_list

    class Meta:
        model = Shipment
        fields = ('shipment_id', 'order_id', 'shipped', 'shipment_count', 'shipping_list', 'date_created', 'date_updated', 'date_deleted')
