import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://hopeogbons.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hope Ogbons
            </a>
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
