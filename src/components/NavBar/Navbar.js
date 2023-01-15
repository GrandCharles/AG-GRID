import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  //border-bottom: 2px solid #f1f1f1;
  //width: 10%;
  //height: 20px;
  //padding: 0 20px;
  
  display: flex;
  //justify-content: space-between;
  align-items: center;
  
`

const Navbar = () => {
  return (
    <Nav>
      <Burger/>
    </Nav>
  )
}

export default Navbar