import React     from 'react';
import * as styl from './styles';

import logoSaib from '../../assets/Logo_Saibweb.png';

import { FaCircleNotch,FaShoppingBag,FaTh } from "react-icons/fa";
//import { HiOutlineMenu } from "react-icons/hi"; // fechar

import dataExtenso   from '../../utils/dataExtenso';
import dataFormatada from '../../utils/dataFormatada';

import  Navbar from '../NavBar/Navbar'

function Header() {

      const dt = dataExtenso(dataFormatada(new Date(),'dd/mm/yyyy'));

    /*
    async function sair() {
        //localStorage.removeItem('@grandCharles/macadddress');
        //window.location.reload();
    }
    */

    return (

        <styl.Container>

            <styl.LeftSide>
                <div id="dv1">
                    <Navbar />
                </div>

                <div id="dv2">
                    <img src={logoSaib} alt='Logo' />
                </div>

            </styl.LeftSide>

            <styl.SpaceSide>
            </styl.SpaceSide>

            <styl.CenterSide>
                <span>
                    <FaShoppingBag size={12}/>
                    <span></span>
                    105 - SAIBWEB IMPLANTAÇÃO
                </span>

                <span>
                    <FaTh size={12}/>
                    <span></span>
                    SFA
                </span>
            </styl.CenterSide>

            <styl.SpaceSide>
            </styl.SpaceSide>

            <styl.RightSide>

                <span>
                    Bem Vindo(s):
                </span>

                <span>
                    USUARIO.SAIBWEB:
                </span>

                <span id="dt">
                    {dt}:
                </span>

            </styl.RightSide>

            <styl.Logout>
                <button id= "btnHover" 
                        type="button" 
                        //onClick={() => {}} 
                        title="Sair do Sistema com segurança">


                    <FaCircleNotch size={35}/>
                </button>
            </styl.Logout>

        </styl.Container>

    )

}

export default Header;
