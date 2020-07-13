import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import { style } from 'contexts/Variables.jsx';

import { clientRoutes } from 'routes.js';

import image from 'assets/img/sidebar.jpg';

class ClientLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: 'black',
      hasImage: true,
      fixedClasses: 'dropdown show-dropdown open',
    };
  }
  handleNotificationClick = (position) => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = 'success';
        break;
      case 2:
        level = 'warning';
        break;
      case 3:
        level = 'error';
        break;
      case 4:
        level = 'info';
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: <div>This notification is triggered by a click.</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
  };
  getRoutes = (clientRoutes) => {
    return clientRoutes.map((prop, key) => {
      if (prop.layout === '/client') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getPageText = (path) => {
    for (let i = 0; i < clientRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          clientRoutes[i].layout + clientRoutes[i].path,
        ) !== -1
      ) {
        return clientRoutes[i].name;
      }
    }
    return 'Menu';
  };
  handleImageClick = (image) => {
    this.setState({ image: image });
  };
  handleColorClick = (color) => {
    this.setState({ color: color });
  };
  handleHasImage = (hasImage) => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show-dropdown open' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  };
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar
          {...this.props}
          routes={clientRoutes}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
        />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            pageText={this.getPageText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(clientRoutes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ClientLayout;
