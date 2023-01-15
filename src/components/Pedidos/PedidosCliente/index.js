import { useState } from "react";     // Guardo o estado de uma pagina
import { FaTimes }  from "react-icons/fa";
import { Link }     from 'react-router-dom'
import InputMask    from 'react-input-mask';

import * as styl        from '../PedidosCliente/styles'
import api              from '../../../services/api'
import Header           from '../../Header'
import dataFormatada    from '../../../utils/dataFormatada'
import moedaFormatada   from '../../../utils/moedaFormatada'
import PdfPedidoCliente from '../../Reports/Pedidos/PedidosCliente'
import ExcelPedidoCliente from '../../Reports/Pedidos/PedidosCliente/indexExcel'

import { alerta }    from '../../../utils/mensagem'

const situac = [
  { value: '', text: '' },
  { value: 'AGUARDANDO FATURAMENTO', text: 'AGUARDANDO FATURAMENTO' },
  { value: 'PENDENTE', text: 'PENDENTE' },
  { value: 'FATURADO', text: 'FATURADO' },
  { value: 'REJEIÇÃO NOTA', text: 'REJEIÇÃO NOTA' },
  { value: 'LIBERADO5', text: 'LIBERADO' },
  { value: 'DEVOLVIDO', text: 'DEVOLVIDO' },
  { value: 'CANCELADO', text: 'CANCELADO' },
  { value: 'LIBERADO', text: 'LIBERADO' },

];
const SelectSit = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="input" id="situacao">
      {options.map(option => {
        return (<option key={option.value} value={option.value}>{option.text}</option>);
      })}
    </select>
  );
};


const operac = [
  { value: '', text: '' },
  { value: '1', text: '1 - VENDA ESTADUAL' },
  { value: '2', text: '2 - BONIFICAÇÃO' },
  { value: '3', text: '3 - COMODATO' },
  { value: '4', text: '4 - DEVOLUCAO VENDA ESTADUAL' },
  { value: '5', text: '5 - S - VENDA' },
  { value: '6', text: '6 - S - VENDA RMF' },
  { value: '7', text: '7 - SM - VENDA' },
];
const SelectOper = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="input" id="operacao">
      {options.map(option => {
        return (<option key={option.value} value={option.value}>{option.text}</option>);
      })}
    </select>
  );
};

const dataSys = dataFormatada(Date(), "yyyy-mm-dd", false);


function PedidosCliente() {
  const [dados, setDados] = useState([]);
  const [response, setResponse] = useState([]);

  const [codigo, setCodigo] = useState();
  const [clienteId, setClienteId] = useState();
  const [operacao, setOperacao] = useState(0);
  const [situacao, setSituacao] = useState('0');
  const [dtIni, setDtIni] = useState('2021-11-01');
  const [dtFim, setDtFim] = useState(dataSys);


  // Totalizadores
  const [totalLitragem, setTotalLitragem] = useState(0);
  const [vlrTotal, setVlrTotal] = useState(0);
  const [qtdItens, setQtdItens] = useState(0);
  const [vlrUnitario, setVlrUnitario] = useState(0);

  /*
  const handleChangeOper = (e) => {
    setOperacao(e.target.value);
  }
*/


  function montaRota() {
    var cod = document.getElementById("codigo");
    var dataIni = document.getElementById("dataIni");
    var dataFim = document.getElementById("dataFim");
    var oper = document.getElementById("operacao");
    var situ = document.getElementById("situacao");

    var rota = "/v1/sfa/dashboard/pedidos-por-cliente?";

    if (parseInt(cod.value) > 0) {
      rota = rota + "numero=" + cod.value + '&';
    }

    rota = rota + "dataInicio=" + dataIni.value;
    rota = rota + "&dataFim=" + dataFim.value;

    if (oper.value !== "") {
      rota = rota + "&operacaoId=" + oper.value;
    }

    if (situ.value !== "") {
      rota = rota + "&situacao=" + situ.value;
    }

    
    return rota;
  }

  function hideElem() {
    document.getElementById("btnPdf").style.visibility = "hidden";
    document.getElementById("btnExcel").style.visibility = "hidden";
  }
  function showElem() {
    document.getElementById("btnPdf").style.visibility = "visible";
    document.getElementById("btnExcel").style.visibility = "visible";
  }

  async function loadDados() {
    const rota = montaRota();

    //console.log(rota);

    try {

      setDados([]);

      const response = await api.get(`${rota}`)

      const { retorno } = response.data;
      setResponse(response.data);

      if (retorno) {

        const { list } = retorno;
        setDados(list);

        const { totalizador } = retorno;
        setTotalLitragem(totalizador.totalLitragem);
        setVlrTotal(totalizador.vlrTotal);
        setQtdItens(totalizador.qtdItens);
        setVlrUnitario(totalizador.vlrUnitario);

        showElem();

      } else {
        hideElem();
        alerta({ type: "warn", message: "Dados para o relatório não encontrado" })
      }

    } catch (error) {
      alerta({ type: "error", message: `Erro na carga de pedidos: ${error}` });
    }
  }



  function imprimePdf() {
    PdfPedidoCliente(response, dtIni, dtFim);
  }
  function imprimeExcel() {
    new ExcelPedidoCliente(response, dtIni, dtFim).Imprimir();
  }

  /*
    useEffect(() => {
      console.log(load);
  
      if (!load) {
        loadDados();
        load = true;
      }
    })
  */

  return (

    <>

      <Header />

      <styl.Container>

        <styl.CtnRelPedHeader>
          <span>RELATÓRIO DE PEDIDOS POR CLIENTE(s)</span>

          <Link to="/sfa" >
            <FaTimes size={22} color='#FFFAF0' />
          </Link>
        </styl.CtnRelPedHeader>
        <styl.CtnRelPedInput>

          <span className="span">CÓDIGO:</span>
          <InputMask
            id="codigo"
            className="input"
            mask="999999"
            type='text'
            maskChar=""
            value={codigo}
            onChange={(ev) => { loadDados() }}
          />

          <span className="span">CLIENTE:</span>
          <input
            id="clien"
            className="input"
            type='text'
            value={clienteId}
            onChange={ev => {
              setClienteId(ev.target.value);

            }}
          />

          <span className="span">OPERAÇÃO:</span>
          <SelectOper options={operac}
            value={operacao}
            onChange={(ev) => {
              setOperacao(ev.target.value)
              loadDados()
            }}
          />

          <span className="span">SITUAÇÃO:</span>
          <SelectSit options={situac}
            value={situacao}
            onChange={(ev) => {
              setSituacao(ev.target.value)
              loadDados()
            }}
          />

          <span className="span">DATA INICIAL:</span>
          <input id="dataIni"
            className="input"
            type='date'
            value={dtIni}
            onChange={ev => {
              setDtIni(ev.target.value);
              loadDados()
            }}
          />

          <span className="span">DATA FINAL:</span>
          <input id="dataFim"
            className="input"
            type='date'
            value={dtFim}
            onChange={ev => {
              setDtFim(ev.target.value);
              loadDados()
            }}
          />

          <button id="btnPdf"
            className="btn btn-primary"
            type="submit"
            onClick={(e) => { imprimePdf(); }} >
            PDF
          </button>

          <button id="btnExcel" 
                  className="btn btn-primary" 
                  type="submit"  
                  onClick={(e) => { imprimeExcel(); }} >
                  EXCEL
          </button>
          
        </styl.CtnRelPedInput>

        <styl.CtnRelPed >

          {dados.length === 0 &&
            <styl.CtnButtonPed>
              <button type="submit"
                className="btn btn-primary"
                onClick={loadDados}
              >
                Selecione as opções e intervalo para visualizar, RELATÓRIO DE PEDIDOS POR CLIENTE(s)
              </button>
            </styl.CtnButtonPed>
          }


          {dados.length > 0 &&

            <styl.CtnRel >

              <div class="wrapper">

                <table className="classHeader"   >
                  <thead  >
                    <tr >
                      <th width='100px' >N.PEDIDO</th>
                      <th width='400px'>OPERAÇÃO</th>
                      <th width='400px'>SITUAÇÃO</th>
                      <th width='400px'>NOTA FISCAL</th>
                      <th width='110px'>DT.CADASTRO</th>
                      <th width='80px'>QTD.LITROS</th>
                      <th width='80px'>QTD</th>
                      <th width='120px'>VLR.UNIT.(R$)</th>
                      <th width='125px'>VLR.TOTAL.(R$)</th>
                    </tr>
                  </thead>
                </table>


                <table className="classHeader" >

                  <body>

                    {dados.map(dado => {

                      return <>

                        <tr className="trCliente">
                          <th width='490px' align='left' id="borderNoneRight" >
                            {dado.cliente}
                          </th>
                          
                          {/*<th width='10px' id="borderNone"></th>*/}
                          <th width='400px' id="borderNone"></th>
                          <th width='400px' id="borderNone"></th>
                          <th width='110px' id="borderNone"></th>

                          <th width='80px' align='right'>{moedaFormatada(dado.totalizadores.totalLitragem, false)}</th>
                          <th width='80px'  align='center'>{dado.totalizadores.qtdItens}</th>
                          <th width='120px'  align='right'>{moedaFormatada(dado.totalizadores.vlrUnitario, false)}</th>
                          <th width='125px' align='right'>{moedaFormatada(dado.totalizadores.vlrTotal, false)}</th>
                        </tr>

                        {dado.pedidos.map(pedido =>

                          <>

                            <table className="classHeader">
                              <thead >
                                <tr className='trPedido' >
                                  <td width='100px' align='center'>{pedido.PEDF_ID}</td>
                                  <td width='400px' align='center'  >{pedido.OPFT_DESCR}</td>
                                  <td width='400px' align='center'  >{pedido.SITUACAO}</td>
                                  <td width='400px' align='center'>{pedido.NUM_NF}</td>
                                  <td width='110px' align='center'>{dataFormatada(pedido.PEDF_DTA_CAD, 'dd/mm/yyyy', false)}</td>
                                  <td width='80px' align='right' >{moedaFormatada(pedido.totalizador.totalLitragem, false)}</td>
                                  <td width='80px' align='center'>{pedido.totalizador.qtdItens}</td>
                                  <td width='120px' align='right' >{moedaFormatada(pedido.totalizador.vlrUnitario, false)}</td>
                                  <td width='125px' align='right' >{moedaFormatada(pedido.totalizador.vlrTotal, false)}</td>
                                </tr>
                              </thead >
                            </table  >


                            <table className="classHeader" >
                              <thead >
                                <tr className='trHeaderItens'>
                                  <th width='100px' className='collapse' ></th>
                                  <th width='80px'  align='center'>#</th>
                                  <th id="thProduto"align='center'>PRODUTO</th>
                                  <th width='100px' align='center'>UND</th>
                                  <th width='80px'  align='center'>QTD.LITROS</th>
                                  <th width='80px'  align='center'>QTD</th>
                                  <th width='120px' align='center'>VLR UNIT.(R$)</th>
                                  <th width='125px' align='center'>VLR TOTAL (R$)</th>
                                </tr>
                              </thead>

                              {pedido.itens.map(item =>

                                <tbody>

                                  <tr className='trItens'>
                                    <td className='collapse'></td>
                                    <td align='center'>{item.PROD_ID}</td>
                                    <td align='left'>  {item.PROD_DESCR}</td>
                                    <td align='center'>{item.PROD_UND_VDA}</td>
                                    <td align='right'> {moedaFormatada(item.SUM_LITRAGEM, false)}</td>
                                    <td align='center'>{item.PEDF_QTDE}</td>
                                    <td align='right'> {moedaFormatada(item.PEDF_VLR_UNITARIO, false)}</td>
                                    <td align='right'> {moedaFormatada(item.PEDF_VLR_TOTAL, false)}</td>
                                  </tr>

                                </tbody>

                              )}

                            </table>

                          </>

                        )}

                      </>

                    })}

                  </body>

                </table>

                {/*<table className="classTotal" >*/}
                <table className="classHeader" >
                  <thead  >
                    <tr >
                      <th width='810px' align='left' id="borderNoneRight">TOTAL NO PERÍODO</th>
                      <th width='40px' id="borderNone"></th>
                      <th width='40px' id="borderNone"></th>
                      <th width='40px' id="borderNone"></th>
                      <th width='45px' id="borderNone"></th>
                      <th width='120px' align='right'>{moedaFormatada(totalLitragem, false)}</th>
                      <th width='65px' align='center'>{moedaFormatada(qtdItens,false)}</th>
                      <th width='120px' align='right'>{moedaFormatada(vlrUnitario, false)}</th>
                      <th width='120px' align='right'>{moedaFormatada(vlrTotal, false)}</th>
                    </tr>
                  </thead>
                </table>

              </div>

            </styl.CtnRel >
          }

        </styl.CtnRelPed >

      </styl.Container >
    </>
  )

}

export default PedidosCliente;
