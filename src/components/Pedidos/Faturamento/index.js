import React, { useState, useEffect } from "react";     // Guardo o estado de uma pagina
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom'
import { FaPlusCircle, FaSave, FaUserCheck, FaPrint, FaBoxes, FaTimes, FaSearch, FaCubes, FaClipboard, FaLayerGroup } from "react-icons/fa";

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { alpha, styled } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import api from '../../../services/api';
import * as styl from '../Faturamento/styles';
import Header from '../../Header';
import dataFormatada from '../../../utils/dataFormatada';
import { alerta } from '../../../utils/mensagem';

import GridListPed       from '../Grids/GridListagemPedidos';
import GridAgrupaPedidos from '../Grids/GridAgrupaPedidos';

const situac = [
    { value: '0', text: '' },
    { value: '1', text: 'PENDENTE' },
    { value: '2', text: 'LIBERADO' },
    { value: '3', text: 'ENVIADO' },
];
const Select = ({ value, options, onChange }) => {
    return (
        <select value={value} onChange={onChange} className="input" id="situ">
            {options.map(option => {
                return (<option key={option.value} value={option.value}>{option.text}</option>);
            })}
        </select>
    );
};



function montaRota() {
    var cod = document.getElementById("nrPed");
    var dataIni = document.getElementById("dataIni");
    var dataFim = document.getElementById("dataFim");
    var situ = document.getElementById("situ");

    let rota = "/v1/sfa/pedido/get/all?";

    if (parseInt(cod.value) > 0) {
      rota = rota + "numero=" + cod.value + '&';
    }

    rota = rota + "dataInicio=" + dataIni.value;
    rota = rota + "&dataFim=" + dataFim.value;

    if (parseInt(situ.value) > 0) {
      rota = rota + "&situacao=" + situ.value;
    }
   
    return rota;
}

const dataSys = dataFormatada(Date(), "yyyy-mm-dd", false);

let load = true;

function Pedidos() {
    const [dados, setDados] = useState([]);
    const [tabPed, setTabPed] = React.useState(0);

    const [nroPed, setNroPed] = useState('');
    const [dtIni, setDtIni] = useState('2021-01-01');
    const [dtFim, setDtFim] = useState('2021-12-31');
    const [clienteId, setClienteId] = useState();
    const [situacao, setSituacao] = useState(0);

    const [meuPedido, setMeuPedido] = useState(false);


    async function loadDados() {
        const rota = montaRota();

        try {
            setDados([]);
            const response = await api.get(`${rota}`)
            const { retorno } = response.data;

            if (retorno.length > 0) {
                setDados(response.data);
            }
            else {
                setDados([]);

                alerta({ type: "warn", message: "Dados de Pedidos não encontrado" })
            }

        } catch (error) {
            alerta({ type: "error", message: `Erro na carga de pedidos: ${error}` });
        }
    }


    const handleChangeTab = (event, newValue) => {
        setTabPed(newValue);
    };
    const handleChangeSit = event => setSituacao(event.target.value);


    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: green[800],
            '&:hover': {
                backgroundColor: alpha(green[100], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: green[600],
        },
    }));
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    useEffect(() => {
        if (!load) {
            loadDados();
            load = true;
        }
    })

    return (
        <>
            <Header />

            <styl.Container>

                <styl.CtnPedido>

                    <styl.CtnPedidoHeader>
                        <span>PEDIDO DE FATURAMENTO</span>

                        <Link to="/sfa" >
                            <FaTimes size={30} />
                        </Link>
                    </styl.CtnPedidoHeader>

                    <div id="divBotoes">

                        <styl.BotoesLeft>
                            <button id="btnHover" type="button" title="NOVO CADASTRO">
                                <FaPlusCircle size={30} />
                            </button>

                            <button id="btnHover" type="button" title="CONFIRMAR CADASTRO">
                                <FaSave size={30} />
                            </button>
                        </styl.BotoesLeft>

                        <styl.BotoesRight>
                            <button id="btnHover" type="button" title="Impressão Curva ABC">
                                <FaPrint size={30} />
                            </button>

                            <button id="btnHover" type="button" title="Histórico Comercial">
                                <FaUserCheck size={30} />
                            </button>

                            <button id="btnHover" type="button" title="CONSULTA DE ESTOQUE">
                                <FaBoxes size={30} />
                            </button>
                        </styl.BotoesRight>

                    </div>


                    <Box sx={{ width: '100%' }}>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                            <Tabs id="TabPed"
                                aria-label="Pedidos"
                                value={tabPed}
                                onChange={handleChangeTab}  >

                                <Tab icon={<FaSearch size={17} />} label="LISTAGEM DE PEDIDOS" />

                                <Tab icon={<FaClipboard size={17} />} label="DADOS DO PEDIDO" disabled={true} />

                                <Tab icon={<FaCubes size={17} />} label="ITENS DO PEDIDO" />

                                <Tab icon={<FaLayerGroup size={17} />} label="PEDIDOS AGRUPADOS" />
                            </Tabs>
                        </Box>


                        {/* Listagem de Pedidos */}
                        <TabPanel value={tabPed} index={0}>

                            <styl.CtnPesqPed>
                                <styl.CtnPesqPedInput>

                                    <span id="span" >Nro.Pedido:</span>
                                    <InputMask
                                        id="nrPed"
                                        className="input"
                                        mask="999999"
                                        type='text'
                                        maskChar=""
                                        value={nroPed}
                                        onChange={ev => setNroPed(ev.target.value)}
                                    />

                                    <span id="span">Data Inicial:</span>
                                    <input id="dataIni"
                                        className="input"
                                        type='date'
                                        value={dtIni}
                                        onChange={ev => setDtIni(ev.target.value)}
                                    />


                                    <span id="span">Data Final:</span>
                                    <input
                                        id="dataFim"
                                        className="input"
                                        type='date'
                                        value={dtFim}
                                        onChange={ev => setDtFim(ev.target.value)}
                                    />

                                    <span id="span">Cliente:</span>
                                    <input
                                        id="clien"
                                        className="input"
                                        type='text'
                                        value={clienteId}
                                        onChange={ev => setClienteId(ev.target.value)}
                                    />

                                    <span id="span">Situação:</span>
                                    <Select value={situacao} options={situac} onChange={handleChangeSit} />

                                    <FormGroup>
                                        <FormControlLabel
                                            className='seletor'
                                            size="small"
                                            control={<GreenSwitch {...label} defaultChecked />}
                                            checked={meuPedido}
                                            onChange={ev => setMeuPedido(ev.target.checked)}
                                            label={meuPedido ? "Meus Pedidos" : "Todos os Pedidos"}
                                        />
                                    </FormGroup>

                                    <button type="submit" className="btn btn-primary" onClick={loadDados}  >
                                        Pesquizar
                                        <FaSearch size={19} />
                                    </button>

                                </styl.CtnPesqPedInput>
                            </styl.CtnPesqPed>

                            <GridListPed dados={dados} />
                        </TabPanel>


                        <TabPanel value={tabPed} index={1}>
                        </TabPanel>


                        <TabPanel value={tabPed} index={2}>
                        </TabPanel>


                        {/* Pedidos Agrupados */}
                        <TabPanel value={tabPed} index={3}>
                            <styl.CtnPesqPed>
                                <styl.CtnPesqPedInput>

                                    <span id="span" >Nro.Pedido:</span>
                                    <InputMask
                                        id="nrPed"
                                        className="input"
                                        mask="999999"
                                        type='text'
                                        maskChar=""
                                        value={nroPed}
                                        onChange={ev => setNroPed(ev.target.value)}
                                    />

                                    <span id="span">Data Inicial:</span>
                                    <input id="dataIni"
                                        className="input"
                                        type='date'
                                        value={dtIni}
                                        onChange={ev => setDtIni(ev.target.value)}
                                    />


                                    <span id="span">Data Final:</span>
                                    <input
                                        id="dataFim"
                                        className="input"
                                        type='date'
                                        value={dtFim}
                                        onChange={ev => setDtFim(ev.target.value)}
                                    />

                                    <span id="span">Cliente:</span>
                                    <input
                                        id="clien"
                                        className="input"
                                        type='text'
                                        value={clienteId}
                                        onChange={ev => setClienteId(ev.target.value)}
                                    />

                                    <span id="span">Situação:</span>
                                    <Select value={situacao} options={situac} onChange={handleChangeSit} />

                                    <FormGroup>
                                        <FormControlLabel
                                            className='seletor'
                                            size="small"
                                            control={<GreenSwitch {...label} defaultChecked />}
                                            checked={meuPedido}
                                            onChange={ev => setMeuPedido(ev.target.checked)}
                                            label={meuPedido ? "Meus Pedidos" : "Todos os Pedidos"}
                                        />
                                    </FormGroup>

                                    <button type="submit" className="btn btn-primary" onClick={loadDados}  >
                                        Pesquizar
                                        <FaSearch size={19} />
                                    </button>

                                </styl.CtnPesqPedInput>
                            </styl.CtnPesqPed>


                            {dados.retorno &&
                                <GridAgrupaPedidos dados={dados} />
                            }
                        </TabPanel>

                    </Box>

                </styl.CtnPedido>

            </styl.Container>
        </>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


/*    
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
*/
/*
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
*/



export default Pedidos;