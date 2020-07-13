import React, { useState, useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import {
  countAvailableProducts,
  countAllOrders,
  countAllPendings,
  countAllShipments,
} from 'contexts/APIs.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import {
  dataGraph,
  optionsGraph,
  responsiveGraph,
  legendGraph,
} from 'contexts/Variables.jsx';

function Dashboard() {
  const [availableProductCount, setAvailableProductCount] = useState(0);
  useEffect(() => {
    countAvailableProducts().then(setAvailableProductCount, console.error);
  }, []);

  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    countAllOrders().then(setOrderCount, console.error);
  }, []);

  const [pendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    countAllPendings().then(setPendingCount, console.error);
  }, []);

  const [shipmentCount, setShipmentCount] = useState(0);
  useEffect(() => {
    countAllShipments().then(setShipmentCount, console.error);
  }, []);

  const createLegend = (json) => {
    const legend = [];
    for (let i = 0; i < json['names'].length; i++) {
      const type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
    }
    return legend;
  };

  const percentageOf = (count) => {
    const totalCount = orderCount + pendingCount + shipmentCount;
    const percentage = (count / (totalCount || 1)) * 100;
    return percentage.toFixed(1);
  };
  const data = [
    percentageOf(orderCount),
    percentageOf(shipmentCount),
    percentageOf(pendingCount),
  ];
  const dataPie = {
    labels: data,
    series: data,
  };

  const legendPie = {
    names: ['Orders', 'Pendings', 'Shipments'],
    types: ['info', 'warning', 'danger'],
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-server text-success" />}
              statsText="Total Products"
              statsValue={availableProductCount}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Updated now"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-ticket text-info" />}
              statsText="Ordered Items"
              statsValue={orderCount}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText="This month"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-hourglass text-warning" />}
              statsText="Pending Items"
              statsValue={pendingCount}
              statsIcon={<i className="pe-7s-timer" />}
              statsIconText="In the last hour"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-paper-plane text-danger" />}
              statsText="Shipments"
              statsValue={shipmentCount}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Updated now"
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="Drone Flights"
              category="24 Hours activities"
              stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataGraph}
                    type="Line"
                    options={optionsGraph}
                    responsiveOptions={responsiveGraph}
                  />
                </div>
              }
              legend={<div className="legend">{createLegend(legendGraph)}</div>}
            />
          </Col>
          <Col md={4}>
            <Card
              statsIcon="fa fa-clock-o"
              title="Nest Performance"
              category="Fulfilment Statistics"
              stats="Last shipment sent 2 days ago"
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph data={dataPie} type="Pie" />
                </div>
              }
              legend={<div className="legend">{createLegend(legendPie)}</div>}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
