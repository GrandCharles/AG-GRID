//import React from 'react';
import styled from 'styled-components';

import { ToastContainer, toast } from 'react-toastify';
import                                'react-toastify/dist/ReactToastify.css';
import { FaRegShareSquare }      from "react-icons/fa";



const Toast = styled(ToastContainer)`
  .Toastify__toast--info {
    background: 'rgb(51, 102, 255)';
  }
.Toastify__toast--success {
    background: 'rgb(51, 187, 102)';
  }
.Toastify__toast--warning {
    background: 'rgb(254, 255, 20)';
  }
.Toastify__toast--error {
    background: 'rgb(255, 102, 102)';
  }
`;

export default function ToastAnimated() {
  return <Toast/>;
}


export const alerta = async ({ type, message }) => {

  toast.configure({
    autoClose: 3000,
    draggable: false,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: false,
    newestOnTop: true,
    closeButton: FaRegShareSquare,

  })

  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'warn':
      toast.warn(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast.info(message);
  }

}

