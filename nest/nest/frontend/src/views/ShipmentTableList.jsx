import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { getShipments } from "contexts/APIs.jsx";
import { displayItemDetails, formatBooleanText } from "contexts/Presenters.jsx";

function ShipmentTableList() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    getShipments().then(setShipments, console.error);
  }, []);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Shipments List"
              category="A list of all the shipments made from the nest"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>No.</th>
                      <th style={{ width: "5%" }}>Shipment&nbsp;ID</th>
                      <th style={{ width: "5%" }}>Order&nbsp;ID</th>
                      <th>Shipment&nbsp;Items</th>
                      <th style={{ width: "5%" }}>
                        Has&nbsp;Been&nbsp;Shipped
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map(
                      ({ shipment_id, order_id, shipping_list }, key) => {
                        return (
                          <tr key={key}>
                            <td>{++key}</td>
                            <td>
                              <span className="badge badge-info">
                                {shipment_id}
                              </span>
                            </td>
                            <td>
                              <span className="badge badge-info">
                                {order_id}
                              </span>
                            </td>
                            <td>{displayItemDetails(shipping_list)}</td>
                            <td className="text-right">
                              {formatBooleanText(false)}
                            </td>
                          </tr>
                        );
                      }
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

export default ShipmentTableList;
