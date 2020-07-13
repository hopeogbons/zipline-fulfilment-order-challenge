import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { getOrders } from 'contexts/APIs.jsx';
import { displayItemDetails, formatBooleanText } from 'contexts/Presenters.jsx';

function OrderTableList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders, console.error);
  }, []);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Orders List"
              category="A list of all the orders in the nest"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      <th style={{ width: '5%' }}>No.</th>
                      <th style={{ width: '5%' }}>Order&nbsp;ID</th>
                      <th>Items&nbsp;Ordered</th>
                      <th>Items&nbsp;Unfulfiled</th>
                      <th style={{ width: '5%' }}>
                        Has&nbsp;Pending&nbsp;Items
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(
                      (
                        { order_id, order_list, pending_list, is_pending },
                        key,
                      ) => {
                        return (
                          <tr key={key}>
                            <td>{++key}</td>
                            <td>
                              <span className="badge badge-info">
                                {order_id}
                              </span>
                            </td>
                            <td>
                              <div>{displayItemDetails(order_list)}</div>
                            </td>
                            <td>
                              <div>{displayItemDetails(pending_list)}</div>
                            </td>
                            <td className="text-right">
                              {formatBooleanText(is_pending)}
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default OrderTableList;
