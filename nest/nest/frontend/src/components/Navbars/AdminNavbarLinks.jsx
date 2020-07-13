import React from 'react';
import { NavItem, Nav } from 'react-bootstrap';

function AdminNavbarLinks({ url }) {
  const subroute = url.substring(1, url.lastIndexOf('/'));
  return (
    <div>
      <Nav pullRight>
        <NavItem
          eventKey={1}
          href={subroute === 'client' ? '/admin/dashboard' : '/client/requests'}
        >
          <i className="pe-7s-users" />
          &nbsp;
          {subroute === 'client' ? 'Healthcare Worker' : 'Fulfilment Staff'}
        </NavItem>
      </Nav>
    </div>
  );
}

export default AdminNavbarLinks;
