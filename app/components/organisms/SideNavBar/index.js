import React from 'react';
import Item from '../../molecules/MenuItem/index';
import NavBar from '../../molecules/NavBar/index';
import Menu from '../../molecules/Menu';
import NavHeader from '../../molecules/NavBar/NavHeader';
import NavFooter from '../../molecules/NavBar/NavFooter';
const SideNavBar = props => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div>
      <NavBar orientation="vertical">
        <NavHeader height="8xl">header</NavHeader>
        <Menu>
          <Item to="/">Home</Item>
          <Item to="/Projects">Projects</Item>
          <Item to="/Files">Files</Item>
          <Item to="/Clients">Clients</Item>
          <Item to="/Payments">Payments</Item>
          <Item to="/Profile">Profile</Item>
        </Menu>
      </NavBar>
    </div>
  </div>
);

export default SideNavBar;
