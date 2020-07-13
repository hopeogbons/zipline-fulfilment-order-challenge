import React, { useState, useEffect, useRef } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import { patchRequests } from 'contexts/APIs.jsx';
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
      addNotification('success', 'Successfully ordered the products');
      setFormValues({});
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
    formData.append('order', data);
    if (formKeys.length) {
      patchRequests(formData).then(setSuccess, console.error);
    } else {
      addNotification('error', 'Kindly enter the quantities to order');
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
              title="Requests Form"
              category="A list of all the products a health facility can request for"
              ctTableFullWidth
              ctTableResponsive
              content={
                <form id="formOrder" onSubmit={handleSubmit}>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>No.</th>
                        <th>Product&nbsp;name</th>
                        <th style={{ width: '5%' }}>Mass&nbsp;(g)</th>
                        <th className="text-right">Request&nbsp;Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(
                        ({ product_id, product_name, mass_g }, key) => {
                          return (
                            <tr key={key}>
                              <td>{++key}</td>
                              <td>{product_name}</td>
                              <td>{mass_g}g</td>
                              <td className="text-right">
                                <FormInputs
                                  ncols={['col-md-12']}
                                  properties={[
                                    {
                                      name: 'order[]',
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
                    Request
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
