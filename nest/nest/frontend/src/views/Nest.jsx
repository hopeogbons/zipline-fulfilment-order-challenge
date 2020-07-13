import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import { postNests } from 'contexts/APIs.jsx';
import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

function NestForm() {
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
    if (success)
      addNotification('success', 'Successfully (re)intialized the catalog');
  }, [success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('product_info')) {
      postNests(formData).then(setSuccess, console.error);
    } else {
      addNotification('error', 'Kindly paste in your json payload');
    }
  };

  return (
    <div className="content">
      <NotificationSystem ref={notificationSystem} />
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Nest Form"
              content={
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Initialize Catalog</ControlLabel>
                        <FormControl
                          name="product_info"
                          rows="8"
                          autoComplete="off"
                          componentClass="textarea"
                          bsClass="form-control"
                          placeholder="Enter your products catalog here"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button bsStyle="info" pullRight fill type="submit">
                    Initialize
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default NestForm;
