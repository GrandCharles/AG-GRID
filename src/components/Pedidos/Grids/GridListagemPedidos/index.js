import React, { useState} from "react";
import * as styl          from './styles';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { FaPrint, FaTrash, FaRegEdit } from "react-icons/fa";

import api            from '../../../../services/api';
import moedaFormatada from '../../../../utils/moedaFormatada'
import dataFormatada  from '../../../../utils/dataFormatada';
import PdfPedido      from '../../../Reports/Pedidos/PedidosGrid'

import { alerta }    from '../../../../utils/mensagem'

const columnDefs = [
    {
        headerName: 'Ações',
        field: 'acao',
        filter: false,
        sortable: false,
        width: 140,
        minWidth: 130,
        cellRenderer: "ButtonActionRenderer"
    },

    { headerName: 'PEDIDO', field: 'PEDF_ID', filter: "agNumberColumnFilter", width: 120 },
    { headerName: 'PED.GERADO', field: 'PEDF_ID_FAT', filter: "agTextColumnFilter", width: 140 },
    { headerName: 'CLIENTE', field: 'CLI_RAZAO_SOCIAL', filter: "agTextColumnFilter", width: 200 },
    { headerName: 'ROTA', field: 'DESCRICAO_ROTA', filter: "agTextColumnFilter", width: 200 },
    { headerName: 'DT.CADASTRO', field: 'PEDF_DTA_CAD', filter: "agDateColumnFilter", cellRenderer: (data) => { return dataFormatada(data.value, "dd/mm/yyyy", true); }, width: 170 },
    //{ headerName: 'DT.CADASTRO', field: 'PEDF_DTA_EMISS', filter: "agDateColumnFilter", cellRenderer: (data) => { return data.value ? (new Date(data.value)).toLocaleDateString() : ''; }, width: 150 },
    { headerName: 'USUÁRIO', field: 'USR_NOME_COMP', filter: "agTextColumnFilter" },
    { headerName: 'SITUAÇÃO FAT.', field: 'SITUACAO',  filter: "agTextColumnFilter",  cellStyle: cellStyle},
    { headerName: 'VLR.TOTAL', field: 'PEDF_VLR_TOT_PED', filter: "agNumberColumnFilter", valueFormatter: (params) => moedaFormatada(params.data.PEDF_VLR_TOT_PED, true), width: 150,
      cellStyle: {textAlign: 'right'}}

];


const defaultColDef = {
    editable: false,
    resizable: true,
    sortable: true,
    //wrapText: true
    //animateRows: true,
    //unSortIcon: true,
    //rowHeight: 12,
    //height: 10
};

// altura da linha
const getRowHeight = params => params.node.group ? 50 : 28;

// altura do Header
const headerHeight = 21;

const rowSelection = 'single'

function cellStyle(params) {
    var color = params.value === 'LIBERADO' ? '#00FF00' : 
                params.value === 'PENDENTE' ? '#DAA520' : 
                params.value === 'FATURADO' ? '#00BFFF' : 
                params.value === 'AGUARDANDO FATURAMENTO' ? '#00BFFF' : null;

    return {
        color: color,
        textAlign: 'center'
    };
}


function ButtonActionRenderer(props) {
    const [checked, setChecked] = useState(true);
    const { PEDF_ID } = props.data

    const rota = `/v1/sfa/pedido/rel/espelho_pedido?pedf_id=${PEDF_ID}`;

    //const rota = `/v1/sfa/pedido/rel/espelho_pedido?pedf_id=${3638}`;
    // console.log(rota)

    function handleCheckboxChange() {
        setChecked(!checked);
    }

    async function loadPedido() {
        try {
            const res = await api.get(`${rota}`)

            const { retorno } = res.data

            if (retorno.itens.length > 0 || retorno.itens === null) {
                PdfPedido(retorno)
            } else {
                alerta({ type: "warn", message: `Dados para Emissão do Pedido: ${PEDF_ID}` })
            }

        } catch (error) {
            alerta({ type: "error", message: `Erro na emissão do pedido: ${PEDF_ID} ${error}` });
        }
    }

    /*
     useEffect(() => {
         loadPedido();
    }, []);
    */

    return (

        <>

            <button className="btnImp"
                onClick={(e) => {
                    
                    loadPedido();
                }}
                type="button">

                <FaPrint size={18} />

            </button>

            <button className="btnRead"  >
                <FaRegEdit size={18} />
            </button>

            <input 
                className="check"
                type="checkbox"
                checked={checked}
                
                onClick={handleCheckboxChange}  
                //onChange={handleCheckboxChange} 
            />

            <button className="btnDel"  >
                <FaTrash size={18} />
            </button>
        </>
    );
}




function Grid({ dados }) {
    const { retorno } = dados
    
    return (

        <styl.Container>

            <div id="grid"
                className="ag-theme-balham" 
                style={{ width: '100%', height: 470 }} >

                <AgGridReact 
                    rowData={retorno}
                    columnDefs={columnDefs}
                    // onCellClicked={(ev) => console.log(ev.data)}
                    defaultColDef={defaultColDef}
                    headerHeight={headerHeight}
                    rowSelection={rowSelection}
                    getRowHeight={getRowHeight}
                    frameworkComponents={{ ButtonActionRenderer, }}
                >

                </AgGridReact>

            </div>

        </styl.Container>

    )
}


export default Grid;

