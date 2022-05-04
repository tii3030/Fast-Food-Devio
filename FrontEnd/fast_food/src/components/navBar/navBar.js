import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
} from './navBarSTL';
import Logo from '../logo/logo';

const Navbar = () => {
  return (
    <>
      <Nav>

        <Logo />


        <NavMenu>
          <NavLink to='/pedidos'>
            Pedidos
          </NavLink>
          <NavLink to='/cozinha'>
            Cozinha
          </NavLink>
          <NavLink to='/retirada'>
            Retirada
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;