import React, { useState } from 'react';
import styled from 'styled-components';
import LeftNav from './LeftNav';
import { HiOutlineMenu } from "react-icons/hi"; // fechar

const StyledBurger = styled.div`
  //width: 2rem;
  //height: 2rem;
  //position: fixed;
  //top: 25px;
  //margin-top: 15px;
  //left: 20px;
  //z-index: 0;
  display: none;

  @media (max-width: 2600px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
 
`;


const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <HiOutlineMenu size={23}/>
      </StyledBurger>
      <LeftNav open={open}/>
    </>
  )
}

export default Burger