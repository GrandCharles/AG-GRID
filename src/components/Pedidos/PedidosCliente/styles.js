import styled from 'styled-components';
import px2vw from '../../../styles/px2vw'


export const Container = styled.div`
    width: 99%;
    height: 750px;
    box-shadow: 0px 1px 19px -2px #4B0082;
    border-radius: 5px;
    background-color: white;
    margin: 10px;;
    margin-left: 10px;   
    transition: all 0.3s ease;
    cursor: pointer;

    //display: flex;
    //justify-content: center;
    //align-content: stretch;



    @media (min-width: 320px)  {
        //border: 2px solid yellow;  
        width: 96%;
    }
    @media (min-width: 640px)  {
        //border: 2px solid green;  
        width: 97%;
    }
    @media (min-width: 720px)  {
        //border: 2px solid magenta;  
        width: 98%;
    }
    @media (min-width: 960px)  {
        //border: 2px solid red;  
        width: 98%;
    }
    @media (min-width: 1024px)  {
        //border: 2px solid black;  
        width: 98%;
    }
    @media (min-width: 1380px)  {
        //border: 2px solid blue;  
        width: 99%;
    }
`

export const CtnRelPedHeader = styled.div`
    //border: 2px solid blue;  

    background-color: #4B0082;
    height: 30px;  
    border-radius: 3px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 13px;
        font-weight: bold;
        margin-top: 0px;
        color: #FFFAF0;

        @media (min-width: 320px)  {
            margin-left: 85px;
        }
        @media (min-width: 640px)  {
            margin-left: 160px;
        }
        @media (min-width: 720px)  {
            margin-left: 300px;
        }
        @media (min-width: 960px)  {
            margin-left: 350px;
        }
        @media (min-width: 1024px)  {
            margin-left: 450px;
        }
        @media (min-width: 1380px)  {
            margin-left: 500px;
        }
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

    @media (min-width: 320px)  {
        width: 99% ;
    }
    @media (min-width: 640px)  {
        width: 99% ;
    }
    @media (min-width: 720px)  {
        width: 99% ;
    }
    @media (min-width: 960px)  {
        width: 99% ;
    }
    @media (min-width: 1024px)  {
        width: 100% ;
    }
    @media (min-width: 1380px)  {
        width: 100% ;
    }

`

export const CtnRelPedInput = styled.div`
    //border: 2px solid magenta;  
    border-radius: 3px;

    display: flex;
    justify-content: flex-start;
    flex-flow: column wrap;

    width: 100%;
    margin-top: 5px;
    margin-left: 5px;

    @media (min-width: 320px)  {
        width: 97%;
        height: 350px;  
    }
    @media (min-width: 640px)  {
        width: 97%;
        height: 350px;  
    }
    @media (min-width: 720px)  {
        width: 98%;
        height: 350px;  
    }
    @media (min-width: 960px)  {
        width: 98%;
        height: 320px;  
    }
    @media (min-width: 1024px)  {
        width: 99%;
        height: 60px;  
    }
    @media (min-width: 1380px)  {
        width: 99%;
        height: 60px;  
    }

    .input  {
        float: center;
        padding: 5px 5px;
        //margin-left: 8px;

        border-width: 2px;
        border-color: #707070;

        font-size: 12px;
        border-radius: 5px;
        background-color: #fff;
        opacity: 0.5;
    }

    .span {
        font-size: 11px;
        font-weight: bold;
        color: #707070;
        
        margin: 2px 18px;
        margin-left: 8px;
    }


    #codigo {
        height: 18px;
        margin-left: 5px;

        @media (min-width: 320px)  {
            width: ${px2vw(1160)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1220)};
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
    #clien {
        height: 18px;
        margin-left: 8px;

        @media (min-width: 320px)  {
            width: ${px2vw(1160)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1220)};
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

    #operacao, #situacao  {
        height: 30px;
        margin-left: 8px;
        font-weight: bold;

        @media (min-width: 320px)  {
            width: ${px2vw(1190)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1240)};
        }
        @media (min-width: 720px)  {
            width: ${px2vw(1200)};
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

    #dataIni,  #dataFim {
        height: 18px;
        margin-left: 8px;
        font-weight: bold;

        @media (min-width: 320px)  {
            width: ${px2vw(1160)};
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1210)};
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

    button {
        margin-top: 8px;
        height: 26px;  
        border:0; 
        background: #4B0082; 
        color:  #fff; 
        border-radius: 4px; 
        font-weight: bold; 
        font-size: 12px;

        visibility: hidden;

        &:hover {
            opacity: 0.7;
        }

        @media (min-width: 320px)  {
            width: ${px2vw(1210)};
            margin-left: 5px;
        }
        @media (min-width: 640px)  {
            width: ${px2vw(1250)};
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
        
       
    }  
`

export const CtnRelPed = styled.div`
    //border: 2px solid black;  
    width: 97%;
    height: 36px;
    margin-left: 5px;

    @media (min-width: 320px)  {
        width: 97%;
    }
    @media (min-width: 640px)  {
        width: 97%;
    }
    @media (min-width: 720px)  {
        width: 98%;
    }
    @media (min-width: 960px)  {
        width: 98%;
    }
    @media (min-width: 1024px)  {
        width: 99%;
    }
    @media (min-width: 1380px)  {
        width: 99%;
    }

`

export const CtnButtonPed = styled.div`
    //border: 2px solid red;  

    height: 35px;  
    //margin-left: 1px;
    margin-top: 1px;

    display: flex;
    justify-content: flex-start;
    
    button {
        width: 100%;
        //height: 35px;  
        text-align: left;
        border-radius: 1px; 
        font-size: 13px;

        border: 2px solid #ddd;  

        &:hover {
            opacity: 0.5;
        }
    }  

`


export const CtnRel = styled.div`
    //border: 2px solid red;  
    //width: 100%;
    height: 740px;
    //display: flex;


    .wrapper{ 
        overflow-y:scroll; 
        position:relative;
        height: 750px;
    }

    table {
        margin-left: 5px;
        height: 30px;
        border-spacing: 0;
        font-size: 12px;
        //vertical-align: middle;

        tr th, tr td {
            height: 30px;
            font-size: 12px;
            vertical-align: middle;
            //border: 0.5px solid #000;
            border: 0.5px solid #C0C0C0;
        }
    }
    

    #borderNone {
        //border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        //border-bottom: none !important;
    }
    #borderNoneRight {
        //border-top: none !important;
        //border-left: none !important;
        border-right: none !important;
        //border-bottom: none !important;
    }

    .classHeader {
        border-radius: 5px; 
        background-color: #F1F1F1
    }


    .trCliente {
        background-color: #C9DBEF;
        vertical-align: ;
    }

    .trPedido {
        &:hover {
            opacity: 0.7;
        }
    }


    .trHeaderItens {
        font-weight: bold;
        background-color: #DCDCDC;

        &:hover {
            opacity: 0.7;
        }
        
    }
    .trItens {
        //height: 35px;
        &:hover {
            opacity: 0.7;
        }

    }

    #thProduto {
        @media (min-width: 320px)  {
            width: 90px
        }
        @media (min-width: 640px)  {
            width: 150px
        }
        @media (min-width: 720px)  {
            width: 300px
        }
        @media (min-width: 960px)  {
            width: 400px
        }
        @media (min-width: 1024px)  {
            width: 460px
        }
        @media (min-width: 1380px)  {
            width: 965px
        }



    }

    .classTotal {
        font-weight: bold;
        background-color: #D3D3D3;
    }



    .collapse {
        visibility: collapse;
        background-color: #E0FFFF;

    }    


`

