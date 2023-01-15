import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { FaCubes, FaPrint } from "react-icons/fa";


const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;

  li {
    padding: 48px 0px;
  }
  
  a, u {
    text-decoration: none;
  }

  @media (max-width: 2600px) {
    flex-flow: column nowrap;
    background-color: #8A2BE2;
    position: fixed;

    transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0%)'};

    top: 55px;
    left: -290px;
    height: 100%;
    width: 250px;

    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const LeftNav = ({ open }) => {

  return (
    <Ul open={open}>

      <Link to="/sfa/Pedidos/Faturamento" >

        <li>
          <FaCubes size={12} />
          PEDIDO DE FATURAMENTO
        </li>

      </Link>

      <Link to="/sfa/RelCliente" >
        <li>
          <FaPrint size={12} />

          PEDIDOS POR CLIENTE
        </li>
      </Link>

    </Ul>
  )
}

export default LeftNav

/*
{<FaCubes size={17}
*/