import * as React from 'react';
import * as styl from './styles';

//import PropTypes from 'prop-types';

import Box            from '@mui/material/Box';
import Collapse       from '@mui/material/Collapse';
import IconButton     from '@mui/material/IconButton';
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';
import Typography     from '@mui/material/Typography';
import Paper          from '@mui/material/Paper';

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import dataFormatada from '../../../../utils/dataFormatada';
import moedaFormatada from '../../../../utils/moedaFormatada';


let pedido = []

function Grid({ dados }) {

    const { retorno } = dados;

    const cliente = [];
    retorno.forEach((c) => {
        const linha = [];

        //'[^a-zA-Z0-9]/g-'
        const idCli = c.CLI_RAZAO_SOCIAL.substr(0, 6).replace(/\D/g, '').trim();

        linha.push(idCli);
        linha.push(c.CLI_RAZAO_SOCIAL);
        linha.push(c.CLI_FANTASIA);
        cliente.push(linha);
    });
    cliente.sort();

    var existe;
    const rows = [];
    cliente.forEach((clie) => {
        const nrCli = clie[0];
        existe = false;
        for (let i = 0, l = rows.length; i < l; i++) {
            const nro = rows[i]['idCli'];
            if (nro === nrCli) {
                existe = true;
                break
            }
        }
        if (!existe) {

            pedido = []
            retorno.forEach((ret) => {
                const idCliPed = ret.CLI_RAZAO_SOCIAL.substr(0, 6).replace(/\D/g, '').trim();

                if (idCliPed === nrCli) {
                    const obj = {
                        nroPed: ret.PEDF_ID,
                        opFatPed: ret.CVTO_DESCR,
                        nfPed: ret.NUM_NOTA,
                        sitPed: ret.SITUACAO,
                        dataPed: dataFormatada(ret.PEDF_DTA_EMISS,'dd/mm/yyyy',false),
                        vlrTotalPed: moedaFormatada(ret.PEDF_VLR_TOT_PED,false)
                    }
                    pedido.push(obj);
                }
            });
            rows.push(createData(clie[0], clie[1], clie[2]));

        }
    });

    function createData(idCli, razaoCli, fantasiaCli) {

        return {
            idCli,
            razaoCli,
            fantasiaCli,
            pedidos: pedido
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (

            <React.Fragment>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                    <TableCell width="15px" className="tableCellClie">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <FaArrowUp size={12}/> : <FaArrowDown size={12}/>}
                        </IconButton>

                    </TableCell>

                    <TableCell align="center" component="th" scope="row" className="tableCellClie" width="15px">
                        {row.idCli}
                    </TableCell>

                    <TableCell className="tableCellClie" align="left">{row.razaoCli}</TableCell>
                    <TableCell className="tableCellClie" align="left">{row.fantasiaCli}</TableCell>
                </TableRow>


                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>

                                <Typography className="typography"variant="h6" gutterBottom component="div">
                                    Pedidos
                                </Typography>

                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width="15px" className="tableCellHeader" align="center">Pedido</TableCell>
                                            <TableCell width="180px" className="tableCellHeader" align="left"  >Opção Faturamento</TableCell>
                                            <TableCell width="80px" className="tableCellHeader" align="center">Nota Fiscal</TableCell>
                                            <TableCell width="120px" className="tableCellHeader" align="left"  >Situação  </TableCell>
                                            <TableCell width="15px" className="tableCellHeader" align="center">Data      </TableCell>
                                            <TableCell width="15px" className="tableCellHeader" align="right" >Vlr.Pedido</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {row.pedidos.map((historyRow) => (
                                            <TableRow key={historyRow.nroPed}>
                                                <TableCell className="tableCellPed" align="center" component="th" scope="row">
                                                    {historyRow.nroPed}
                                                </TableCell>
                                                <TableCell className="tableCellPed" align="left"  >{historyRow.opFatPed}</TableCell>
                                                <TableCell className="tableCellPed" align="center"  >{historyRow.nfPed}</TableCell>
                                                <TableCell className="tableCellPed" align="left"  >{historyRow.sitPed}</TableCell>
                                                <TableCell className="tableCellPed" align="center">{historyRow.dataPed}</TableCell>
                                                <TableCell className="tableCellPed" align="right"> {historyRow.vlrTotalPed}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

/*    
    Row.propTypes = {

        row: PropTypes.shape({

            idCli: PropTypes.string.isRequired,
            fantasiaCli: PropTypes.number.isRequired,
            razaoCli: PropTypes.number.isRequired,

            pedidos: PropTypes.arrayOf(
                PropTypes.shape({
                    nroPed: PropTypes.string.isRequired,
                    opFatPed: PropTypes.string.isRequired,
                    vlrTotalPed: PropTypes.number.isRequired,
                }),
            ).isRequired,

        }).isRequired,
    };

*/
    return (

        <styl.Container>

<div class="wrapper">

                <TableContainer component={Paper}>

                    <Table className="MuiTable-root"  aria-label="collapsible table">

                        <TableHead >

                            <TableRow>
                                <TableCell className="tableCellHeader"/>
                                <TableCell className="tableCellHeader" align="center">Código</TableCell>
                                <TableCell className="tableCellHeader" align="left">Razão Social</TableCell>
                                <TableCell className="tableCellHeader" align="left">Nome fantasia</TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.idCli} row={row} />
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>

</div>
        </styl.Container>

    )
}
export default Grid;




