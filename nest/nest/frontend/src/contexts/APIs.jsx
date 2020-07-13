import axios from 'axios';
import { getCookie } from 'assets/js/csrftoken';

axios.defaults.withCredentials = false;
const csrfToken = getCookie('csrftoken');

export const postNests = async (data) => {
  return post('nests', data);
};

export const patchRequests = async (data) => {
  return patch('requests', data);
};

export const patchProducts = async (data) => {
  return patch('products', data);
};
export const getProducts = async () => {
  return get('products');
};
export const countAvailableProducts = async () => {
  return getProducts().then((products) =>
    products.reduce((a, b) => a + (b.quantity !== 0 ? 1 : 0), 0),
  );
};
export const countAllProducts = async () => {
  return getProducts().then((products) => products.length);
};

export const getOrders = async () => {
  return get('orders');
};
export const countAllOrders = async () => {
  return getOrders().then((orders) =>
    sumObjectValuesByKey(orders, 'order_count'),
  );
};
export const countAllPendings = async () => {
  return getOrders().then((orders) =>
    sumObjectValuesByKey(orders, 'pending_count'),
  );
};

export const getShipments = async () => {
  return get('shipments');
};
export const countAllShipments = async () => {
  return getShipments().then((shipments) => shipments.length);
};

const patch = async (entity, data) => {
  const response = await axios({
    method: 'patch',
    url: `http://localhost:3001/api/v1/${entity}/`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'X-CSRFToken': csrfToken,
    },
    xsrfHeaderName: 'X-CSRFToken',
    data,
  });
  return response.data;
};

const post = async (entity, data) => {
  const response = await axios({
    method: 'post',
    url: `http://localhost:3001/api/v1/${entity}/`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'X-CSRFToken': csrfToken,
    },
    xsrfHeaderName: 'X-CSRFToken',
    data,
  });
  return response.data;
};

const get = async (entity) => {
  const response = await axios({
    method: 'get',
    url: `http://localhost:3001/api/v1/${entity}/`,
  });
  return response.data;
};

const sumObjectValuesByKey = (arr, key) => {
  let count = 0;
  let len = arr.length;
  while (len--) count += arr[len][key];
  return count;
};
