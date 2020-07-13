# Zipline Order Fulfilment Challenge

The document details how to setup and navigate the application.

#### How to Setup the Frontend:

Refer to the README file inside the `frontend` folder.

#### How to Setup the Backend:

Refer to the README file inside the `backend` folder.

## How to Navigator the Application Menu

### Dashboard:

The Dashboard is the default landing page. Once you enter the url: `http://localhost:3001`, you are redirected immediately to the dashboard. The dashboard give you an oversight of what the entire application is doing.

### Nest:

This is where the product catalog is (re)initialize. Please note that once you paste in the raw json payload, the entire application is wiped clean.

### Products:

This is where the products are restocked. Please note that you can restock any and every product as many times as you desire.

### Orders:

This is where you get to see the different statuses of the various others made my a healthcare worker.

### Shipments:

This is where you get to see all the products that have been ordered and packaged for shipment.

### Requests:

This is the interface for placing orders.

##### Note:

The `Request` page is not on the same section as the `Dashboard`, `Nest`, `Products`, `Orders`, and `Shipments` pages. It is on a different section because, it is meant to be used by a different set of users who are not the admins.

To access the `Request`, kindly click on the **Fulfilment Staff** button at the top-right corner of the application window. Once you click on it, the button name changes immediately to **Healthcare Worker**. To go back to the `Dashboard`, you can click on it again.
