import styled from 'styled-components';
import px2vw  from  '../../../styles/px2vw'

export const Container = styled.div`
    height: 750px;
    box-shadow: 0px 1px 19px -2px #4B0082;
    border-radius: 5px;
    margin-left: 10px;   
    margin: 10px;   
    transition: all 0.3s ease;
    cursor: pointer;

    display: flex;

    @media (min-width: 320px)  {
        border: 2px solid yellow;  
        width: 96%;
    }
    @media (min-width: 640px)  {
        border: 2px solid green;  
        width: 97%;
    }
    @media (min-width: 720px)  {
        border: 2px solid magenta;  
        width: 98%;
    }
    @media (min-width: 960px)  {
        border: 2px solid red;  
        width: 98%;
    }
    @media (min-width: 1024px)  {
        border: 2px solid black;  
        width: 98%;
    }
    @media (min-width: 1380px)  {
        border: 2px solid blue;  
        width: 99%;
    }

`


export const CtnPedido = styled.div`
    //border: 2px solid red;  

    width: 100%;
    height: 45px;

    /*
    #divHeader {
      //background-color: #DCDCDC;
      color: #4B0082;
      border: 7px solid #FFFAF0;
    }
    */
 
    #divBotoes {
       border: 4px solid #4B0082;
       display: flex;
    }


    #divInputs {
        padding: 15px;
        display: flex;
        flex-direction: column;
    }


   #TabPed {
        padding: 1px 2px;
        border-bottom: 1px solid blue;

        background: #fff;
        color: #4B0082;
        border-color: #4B0082;
    }
    
`


export const CtnPedidoHeader = styled.div`
    background-color: #FFFAF0;
    color: #4B0082;

    display: flex;
    justify-content: space-between;

    span {
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
        margin-top: 10px;
    }

    Link {
        margin-left: 5px;
        line-height: 5px;
        margin: 0 5px;       
        color: #4B0082;
        border: none;
    }

    #btnHover {
        &:hover {
            opacity: 0.7;
        }
    }

`


export const BotoesLeft = styled.div`
    width: 100%;
    background-color: #4B0082;
    
    display: flex;
    justify-content: flex-start;
    @media (min-width: 1024px) {
    }

    button {
        line-height: 5px;
        margin: 0 5px;  
        padding: 0.25em -1em;
             
        background-color: #4B0082;
        color: white;
        border: none;
    }

    #btnHover {
        &:hover {
             opacity: 0.7;
             background: #8A2BE2;
        }
    }

`


export const BotoesRight = styled.div`
    width: 100%;
    background-color: #4B0082;

    display: flex;
    justify-content: flex-end;
    @media (min-width: 1024px) {
    }

    button {
        line-height: 5px;
        margin: 0 5px;       
        color: white;
        background-color: #4B0082;
        border: none;
    }

        #btnHover {
            &:hover{
                opacity: 0.7;
                background: #8A2BE2;
        }
    }
`

//=========================================================================================================//
//=========================================================================================================//
//=========================================================================================================//


export const CtnPesqPed = styled.div`
    margin-top: -20px;       
    margin-left: -15px;          

    display: flex;

    @media (min-width: 320px)  {
        //border: 2px solid yellow;  
        height: 340px;  
    }
    @media (min-width: 640px)  {
        //border: 2px solid green;  
        height: 340px;  
    }
    @media (min-width: 720px)  {
        //border: 2px solid magenta;  
        height: 340px;  
    }
    @media (min-width: 960px)  {
        //border: 2px solid red;  
        height: 340px;  
    }
    @media (min-width: 1024px)  {
        //border: 2px solid black;  
        height: 65px;  
    }
    @media (min-width: 1380px)  {
        //border: 2px solid blue;  
        height: 65px;  
    }

`

export const CtnPesqPedInput = styled.div`
    //border: 2px solid magenta;  
    display: flex;
    flex-flow: column wrap;

    width: 100%;

    @media (min-width: 320px)  {
        //border: 2px solid yellow;  
        height: 340px;  
    }
    @media (min-width: 640px)  {
        //border: 2px solid green;  
        height: 340px;  
    }
    @media (min-width: 720px)  {
        //border: 2px solid magenta;  
        height: 340px;  
    }
    @media (min-width: 960px)  {
        //border: 2px solid red;  
        height: 340px;  
    }
    @media (min-width: 1024px)  {
        //border: 2px solid black;  
        height: 65px;  
        margin-bottom: 5px;             
    }
    @media (min-width: 1380px)  {
        //border: 2px solid blue;  
        height: 65px;  
        margin-bottom: 5px;             
    }

    .input  {
        float: center;
        padding: 5px 5px;
        height: 20px ;

        border-width: 2px;
        border-color: #707070;

        font-size: 12px;
        border-radius: 5px;
        background-color: #fff;
        opacity: 0.5;
    }


    #nrPed {
        height: 15px;
        margin-left: 5px;

        @media (min-width: 320px)  {
            width: ${px2vw(1090)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1170)};
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1200)};
        }
        @media (min-width: 960px)  {
            width: ${px2vw(1260)};
        }
        @media (min-width: 1024px)  {
            width: ${px2vw(140)};
        }
        @media (min-width: 1380px)  {
            width: ${px2vw(170)};
        }
    }
    #dataIni {
        height: 15px;
        margin-left: 5px;
        font-weight: bold;

        @media (min-width: 320px)  {
            width: ${px2vw(1090)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1170)};
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1200)};
        }
        @media (min-width: 960px)  {
            width: ${px2vw(1260)};
        }
        @media (min-width: 1024px)  {
            width: ${px2vw(170)};
        }
        @media (min-width: 1380px)  {
            width: ${px2vw(170)};
        }
    }
    #dataFim {
        height: 15px;
        margin-left: 5px;
        font-weight: bold;

        @media (min-width: 320px)  {
            width: ${px2vw(1090)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1170)};
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1200)};
        }
        @media (min-width: 960px)  {
            width: ${px2vw(1260)};
        }
        @media (min-width: 1024px)  {
            width: ${px2vw(170)};
        }
        @media (min-width: 1380px)  {
            width: ${px2vw(170)};
        }
    }

    #clien {
        height: 15px;
        margin-left: 5px;
        //background-color: red;
        @media (min-width: 320px)  {
            width: ${px2vw(1090)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1170)};
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1200)};
        }
        @media (min-width: 960px)  {
            width: ${px2vw(1260)};
        }
        @media (min-width: 1024px)  {
            width: ${px2vw(140)};
        }
        @media (min-width: 1380px)  {
            width: ${px2vw(170)};
        }
        
    }
    #situ {
        height: 29px;
        margin-left: 5px;

        @media (min-width: 320px)  {
            width: ${px2vw(1130)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1200)};
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1230)};
        }
        @media (min-width: 960px)  {
            width: ${px2vw(1280)};
        }
        @media (min-width: 1024px)  {
            width: ${px2vw(140)};
        }
        @media (min-width: 1380px)  {
            width: ${px2vw(170)};
        }
    }

    #span {
        font-size: 12px;
        color: #707070;
        margin: 2px 7px;
    }

    .seletor {
        margin-top: 15px;
        //font-weight: bold;
    }


    button {

        height: 30px ;
        font-size: 12px;
        font-weight: bold;
        background-color: #4B0082 ;
        border: none;
        border-radius: 7px;
        color: #fff;

        @media (min-width: 320px)  {
            width: ${px2vw(1130)};
            margin-left: 5px;
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1200)};
            margin-left: 5px;
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1230)};
            margin-left: 5px;
        }
        @media (min-width: 960px)  {
            width: ${px2vw(1280)};
            margin-left: 5px;
        }
        @media (min-width: 1024px)  {
            width: 100px;
            margin-top: 18px;
            margin-right: auto;
        }
        @media (min-width: 1280px)  {
            width: 120px;
            margin-top: 18px;
            margin-right: auto;
        }

        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }
    
    &:hover{
        opacity: 0.9;
    }        
`

export const MsgError = styled.span`
    display: block;
    color: #c53030;
    margin-top: 8px;
    font-weight: bold;
`
