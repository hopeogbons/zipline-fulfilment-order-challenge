import React, { useState, useEffect, useRef } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import { patchProducts } from 'contexts/APIs.jsx';
import Card from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import { getProducts } from 'contexts/APIs.jsx';

function ProductTableList() {
  const [formValues, setFormValues] = useState({});
  const notificationSystem = useRef();

  const addNotification = (type, message) => {
    const notification = notificationSystem.current;
    notification.addNotification({
      level: type,
      message: message,
    });
  };

  const [success, setSuccess] = useState(null);
  useEffect(() => {
    if (success) {
      addNotification('success', 'Successfully restocked the products');
    }
  }, [success]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts, console.error);
  }, [success]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formKeys = Object.keys(formValues);
    const data = JSON.stringify(
      formKeys.map((key) => {
        return {
          product_id: parseInt(key),
          quantity: parseInt(formValues[key]),
        };
      }),
    );
    const formData = new FormData();
    formData.append('restock', data);
    if (formKeys.length) {
      patchProducts(formData).then(setSuccess, console.error);
    } else {
      addNotification('error', 'Kindly enter the quantities to restock');
    }
  };

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setFormValues({ ...formValues, [id]: value });
  };

  return (
    <div className="content">
      <NotificationSystem ref={notificationSystem} />
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Products Form"
              category="A list of all the products in the nest"
              ctTableFullWidth
              ctTableResponsive
              content={
                <form id="formRestock" onSubmit={handleSubmit}>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>No.</th>
                        <th style={{ width: '5%' }}>Product&nbsp;ID</th>
                        <th>Product&nbsp;name</th>
                        <th style={{ width: '5%' }}>Mass&nbsp;(g)</th>
                        <th style={{ width: '5%' }}>Quantity</th>
                        <th className="text-right">Restock&nbsp;Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(
                        (
                          { product_id, product_name, mass_g, quantity },
                          key,
                        ) => {
                          return (
                            <tr key={key}>
                              <td>{++key}</td>
                              <td>
                                <span className="badge badge-info">
                                  {product_id}
                                </span>
                              </td>
                              <td>{product_name}</td>
                              <td>{mass_g} g</td>
                              <td>{quantity} unit(s)</td>
                              <td className="text-right">
                                <FormInputs
                                  ncols={['col-md-12']}
                                  properties={[
                                    {
                                      name: 'restock[]',
                                      id: `${product_id}`,
                                      type: 'text',
                                      bsClass: 'form-control',
                                      autoComplete: 'off',
                                      defaultValue: `${formValues[product_id]}`
                                        ? ''
                                        : `${formValues[product_id]}`,
                                      onChange: handleChange,
                                    },
                                  ]}
                                />
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </Table>
                  <Button
                    bsStyle="info"
                    pullRight
                    fill
                    type="submit"
                    style={{ marginRight: '15px' }}
                  >
                    Restock
                  </Button>
                  <div className="clearfix" style={{ height: '20px' }} />
                </form>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default ProductTableList;
