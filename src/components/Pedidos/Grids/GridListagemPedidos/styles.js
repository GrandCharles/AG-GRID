import styled from 'styled-components';

export const Container = styled.div`
    //border: 2px solid red;   
    margin-top: 5px;       
    margin-left: -8px;          


    button {
        border: none;
        cursor: pointer;
    }
    
    &:hover{
            opacity: 0.9;
    }      
    
  
    .btnImp {
        color: #4B0082;
    }

    .btnRead {
        color: #FF8C00;
    }

    .check  {
        width: 18px;
        height: 16px;        
        //color: #006400;

        background-color: ${props => props.checked ? '#006400' : '#4B0082'};
    }

    .btnDel {
        color: #FF0000;
    }


    .ag-header-cell-label {
        font-size: 14px;
        color: gray;
}

    .ag-theme-alpine {
        //font-family: "Font Awesome 5 Free";
    }

    .ag-theme-balham {
        //font-family: "Font Awesome 5 Free";
    }

    .ag-row-hover {
        color: #000080;
    }


`




