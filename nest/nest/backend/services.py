import logging
from nest.backend.models import Product, Order, Shipment, Request

logger = logging.getLogger(__name__)

class NestService:
    @staticmethod
    def init_catalog(product_info):
        logger.info('Initializing catalog: (product_info) -> {}'.format(product_info))
        NestService.truncate_tables([Product, Order, Shipment, Request])
        ProductService.bulk_insert(product_info)
        
        return product_info

    @staticmethod
    def truncate_tables(model_list):
        logger.info('Truncating table(s): (model_list) -> {}'.format(model_list))
        for model in model_list:
            model.objects.all().delete()


class ProductService:
    @staticmethod
    def bulk_insert(product_list):
        logger.info('Inserting products in bulk: (product_list) -> {}'.format(product_list))
        products = [Product(product_id=product['product_id'],
                            product_name=product['product_name'],
                            mass_g=product['mass_g']) for product in product_list]
        Product.objects.bulk_create(products)

    @staticmethod
    def process_restock(restock):
        logger.info('Restocking product(s): (restock) -> {}'.format(restock))
        product_dict = ProductService.fetch_products_by_ids(restock)

        products = [Product(product_id=product['product_id'],
                            quantity=(product_dict[product['product_id']].quantity + product['quantity']))
                            for product in restock]

        Product.objects.bulk_update(products, ['quantity'])
        OrderService.dispatch_pending_orders()

        return restock

    @staticmethod
    def process_deduction(deduction):
        logger.info('Deducting product(s): (deduction) -> {}'.format(deduction))
        product_dict = ProductService.fetch_products_by_ids(deduction)

        products = [Product(product_id=product['product_id'],
                            quantity=(product_dict[product['product_id']].quantity - product['quantity']))
                            for product in deduction]

        Product.objects.bulk_update(products, ['quantity'])

        return deduction

    @staticmethod
    def fetch_products_by_ids(id_dict):
        logger.info('Listing of products from a dictionary of ids: (id_dict) -> {}'.format(id_dict))
        id_list = ProductService.extract_product_ids(id_dict)

        return Product.objects.in_bulk(id_list)

    @staticmethod
    def extract_product_ids(product_list):
        logger.info('Extracting product ids from a list of product(s): (product_list) -> {}'.format(product_list))
        return [product['product_id'] for product in product_list]

    @staticmethod
    def confirm_availability(order_list):
        logger.info('Confirming (un)availability of products ordered: (order_list) -> {}'.format(order_list))
        available_list = []
        unavailable_list = []
        product_dict = ProductService.fetch_products_by_ids(order_list)
        order_dict = {product['product_id']: product['quantity'] for product in order_list}

        for product in product_dict.values():
            product_qty = product.quantity
            order_qty = order_dict[product.product_id]
            has_partial_items = lambda x, y: (x % y) == x

            if has_partial_items(product_qty, order_qty):
                any_available = lambda x, y: (x % y) != 0
                any_unavailable = lambda x, y: y - (x % y)

                if any_unavailable(product_qty, order_qty):
                    unavailable_list.append({'product_id': product.product_id,
                                              'quantity': (order_qty - (product_qty % order_qty)),
                                              'mass_g': product.mass_g})

                if any_available(product_qty, order_qty):
                    available_list.append({'product_id': product.product_id, 'quantity': (product_qty % order_qty),
                                           'mass_g': product.mass_g})
            else:
                available_list.append({'product_id': product.product_id, 'quantity': order_qty,
                                       'mass_g': product.mass_g})

        return available_list, unavailable_list

    @staticmethod
    def segregate_products(product_list):
        logger.info('Segregating the product list: (product_list) -> {}'.format(product_list))
        segregated_list = []

        for product in product_list:
            for x in range(product['quantity']):
                segregated_list.append({'product_id': product['product_id'], 'mass_g': product['mass_g']})

        return segregated_list

    @staticmethod
    def aggregate_products(product_list):
        logger.info('Aggregating the product list: (product_list) -> {}'.format(product_list))
        aggregated_list = []
        temp_dist = {}

        for product in product_list:
            product_id = str(product['product_id'])
            quantity_exists = lambda x, y: bool(x) and (y in x) and ('quantity' in x[y])

            if quantity_exists(temp_dist, product_id):
                quantity = temp_dist[product_id]['quantity']
                temp_dist.update({product_id: {'product_id': product['product_id'], 'quantity': quantity + 1}})
            else:
                temp_dist.update({product_id: {'product_id': product['product_id'], 'quantity': 1}})
        
        for key in temp_dist:
            aggregated_list.append(temp_dist[key])

        return aggregated_list

class RequestService:
    @staticmethod
    def process_request(order):
        logger.info('Processing request: (order) -> {}'.format(order))
        order_id = RequestService.create(order)
        return OrderService.process_order({"order_id": order_id, "requested": order})

    @staticmethod
    def create(order):
        logger.info('Creating request: (order) -> {}'.format(order))
        request = Request.objects.create(requested=order)
        return request.request_id


class OrderService:
    @staticmethod
    def process_order(order):
        logger.info('Processing order: (order) -> {}'.format(order))
        available_list, unavailable_list = ProductService.confirm_availability(order['requested'])
        shipment_list = OrderService.package_shipments(order['order_id'], available_list)

        for shipment in shipment_list:
            ShipmentService.ship_package(shipment)

        ProductService.process_deduction(available_list)
        OrderService.save(order, unavailable_list)
        
        return order

    @staticmethod
    def save(order, unavailable_list=[]):
        logger.info('Saving order details: (order) -> {}, (unavailable_list) -> {}'.format(order, unavailable_list))
        try:
            order_obj = Order.objects.get(pk=order['order_id'])
            order_obj.pending = unavailable_list
            order_obj.is_pending = bool(unavailable_list)
        except Order.DoesNotExist:
            order_obj = Order.objects.create(pk=order['order_id'], requested=order['requested'], pending=unavailable_list, is_pending=bool(unavailable_list))
        
        order_obj.save()

    @staticmethod
    def package_shipments(order_id, shipment_list):
        logger.info('Packaging shipment(s): (order_id) -> {}, (shipment_list) -> {}'.format(order_id, shipment_list))
        sorted_list = sorted(shipment_list, key=lambda shipment: shipment['mass_g'], reverse=True)
        segregated_list = ProductService.segregate_products(sorted_list)

        consignment_list = []
        package_box = []
        box_size = 1800
        item_qty = len(segregated_list)
        loop = 0

        while loop < item_qty:
            product = segregated_list[loop]
            box_can_contain_more = lambda x, y: x <= y

            if box_can_contain_more(product['mass_g'], box_size):
                package_box.append({'product_id': product['product_id'], 'mass_g': product['mass_g'],
                                    'quantity': 1})
                segregated_list.pop(loop)
                box_size -= product['mass_g']
            else:
                loop += 1

            item_qty = len(segregated_list)
            box_is_full = lambda x, y: ((x != 0) and (x == (y - 1))) or (y == 0)

            if box_is_full(loop, item_qty):
                aggregated_list = ProductService.aggregate_products(package_box)
                consignment_list.append({'order_id': order_id, 'shipped': aggregated_list})
                package_box.clear()
                box_size = 1800
                we_need_another_box = lambda x: bool(x)

                if we_need_another_box(item_qty):
                    loop = 0

        return consignment_list

    @staticmethod
    def retrieve_pending_orders():
        logger.info('Retrieving pending orders')
        return Order.objects.filter(is_pending=True)

    @staticmethod
    def dispatch_pending_orders():
        logger.info('Dispatching pending orders')
        order_list = OrderService.retrieve_pending_orders()

        for order in order_list:
            OrderService.process_order({"order_id": order.order_id, "requested": order.pending})


class ShipmentService:
    @staticmethod
    def ship_package(shipment):
        logger.info('Shipping package: (shipment) -> {}'.format(shipment))
        Shipment.objects.create(order_id=shipment['order_id'], shipped=shipment['shipped'])

        return shipment
