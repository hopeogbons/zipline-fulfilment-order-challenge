import Dashboard from 'views/Dashboard';
import InitNestForm from 'views/Nest';
import ProductTableList from 'views/ProductTableList';
import OrderTableList from 'views/OrderTableList';
import ShipmentTableList from 'views/ShipmentTableList';
import RequestTableList from 'views/RequestTableList';

export const adminRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'pe-7s-graph',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/nest',
    name: 'Nest',
    icon: 'pe-7s-network',
    component: InitNestForm,
    layout: '/admin',
  },
  {
    path: '/products',
    name: 'Products',
    icon: 'pe-7s-server',
    component: ProductTableList,
    layout: '/admin',
  },
  {
    path: '/orders',
    name: 'Orders',
    icon: 'pe-7s-ticket',
    component: OrderTableList,
    layout: '/admin',
  },
  {
    path: '/shipments',
    name: 'Shipments',
    icon: 'pe-7s-paper-plane',
    component: ShipmentTableList,
    layout: '/admin',
  },
];

export const clientRoutes = [
  {
    path: '/requests',
    name: 'Requests',
    icon: 'pe-7s-mail-open-file',
    component: RequestTableList,
    layout: '/client',
  },
];
