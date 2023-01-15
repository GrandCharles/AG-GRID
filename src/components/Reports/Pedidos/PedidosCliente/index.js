import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import moedaFormatada from '../../../../utils/moedaFormatada';
import dataFormatada from '../../../../utils/dataFormatada'

var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  },
}

const dataSys = dataFormatada(Date(), "dd/mm/yyyy", true);


export default function PdfPedidoCliente(response, dtIni, dtFim) {
  const { retorno } = response;

  pdfMake.vfs = pdfFonts.pdfMake.vfs

  pdfMake.createPdf(PedidoCliente(retorno), fonts).open();

  function PedidoCliente(ret) {
    const layoutDocumento = MontaDados(ret);

    const content = DefineDocumento(layoutDocumento);

    return content
  }


  function MontaDados(retorno) {
    const layoutDocumento = [];
    const larguraCol = [40, 111, 50, 50, 45, 45, 35, 55, 55];

    const layout = (texto,
      fontSize = 7,
      alignment = 'left',
      bold = false,
      fillColor = "#fff",
      colSpan = 1

    ) =>
    ({
      text: texto,
      fontSize: fontSize,
      alignment: alignment,
      bold: bold,
      fillColor: fillColor,
      colSpan: colSpan
    });

    const headerRelatorio = [];
    headerRelatorio.push(layout('N. PEDIDO', 7, 'center', true, "#ddd"));
    headerRelatorio.push(layout('OPERAÇÃO', 7, 'center', true, "#ddd"));
    headerRelatorio.push(layout('SITUAÇÃO', 7, 'center', true, "#ddd"));
    headerRelatorio.push(layout('NF', 7, 'center', true, "#ddd"));
    headerRelatorio.push(layout('CADASTRO', 7, 'center', true, "#ddd"));
    headerRelatorio.push(layout('QTD LITROS', 7, 'right', true, "#ddd"));
    headerRelatorio.push(layout('QTD', 7, 'right', true, "#ddd"));
    headerRelatorio.push(layout('VLR UNIT. (R$)', 7, 'right', true, "#ddd"));
    headerRelatorio.push(layout('VLR TOTAL (R$)', 7, 'right', true, "#ddd"));
    const linhaRelatorio = [headerRelatorio];


    retorno.list.forEach((cli) => {

      const cliente = [];
      cliente.push(layout(cli.cliente, 7, 'left', true, '#c9dbef', 5));
      cliente.push('');
      cliente.push('');
      cliente.push('');
      cliente.push('');
      cliente.push(layout(moedaFormatada(cli.totalizadores.totalLitragem, false), 7, 'right', true, '#c9dbef'));
      cliente.push(layout(moedaFormatada(cli.totalizadores.qtdItens, false), 7, 'right', true, '#c9dbef'));
      cliente.push(layout('-', 7, 'center', true, '#c9dbef'));
      cliente.push(layout(moedaFormatada(cli.totalizadores.vlrTotal, false), 7, 'right', true, '#c9dbef'));
      linhaRelatorio.push(cliente);

      cli.pedidos.forEach((ped) => {

        const pedido = [];
        pedido.push(layout(ped.PEDF_ID, 7, 'center'));
        pedido.push(layout(ped.OPFT_DESCR));
        pedido.push(layout(ped.SITUACAO, 7, 'center'));
        pedido.push(layout(ped.NUM_NF, 7, 'center'));
        pedido.push(layout(dataFormatada(ped.PEDF_DTA_CAD, "dd/mm/yyyy", false)));
        pedido.push(layout(moedaFormatada(ped.totalizador.totalLitragem, false), 7, 'right'));
        pedido.push(layout(moedaFormatada(ped.totalizador.qtdItens, false), 7, 'right'));
        pedido.push(layout('-', 8, 'center'));
        pedido.push(layout(moedaFormatada(ped.totalizador.vlrTotal, false), 7, 'right'));
        linhaRelatorio.push(pedido);

        const linhaItens = [];

        const headerItens = [];

        headerItens.push(layout('PRODUTO', 7, 'left', true, '#ddd'));
        headerItens.push(layout({}, 7, 'left', true, '#ddd'));
        headerItens.push(layout('UND', 7, 'right', true, '#ddd'));
        headerItens.push(layout('QTD.LITRO', 7, 'right', true, '#ddd'));
        headerItens.push(layout('QTD', 7, 'right', true, '#ddd'));
        headerItens.push(layout('VLR UNIT.(R$)', 7, 'right', true, '#ddd'));
        headerItens.push(layout('VLR TOTAL (R$)', 7, 'right', true, '#ddd'));
        linhaItens.push(headerItens);


        ped.itens.forEach((item) => {
          const itemProduto = [];
          itemProduto.push(layout(item.PROD_ID, 7, 'center'));
          itemProduto.push(layout(item.PROD_DESCR));
          itemProduto.push(layout(item.PROD_UND_VDA));
          itemProduto.push(layout(item.SUM_LITRAGEM,7,'right'));
          //itemProduto.push(layout('-', 7, 'right'));
          itemProduto.push(layout(moedaFormatada(item.PEDF_QTDE, false), 7, 'right'));
          itemProduto.push(layout(moedaFormatada(item.PEDF_VLR_UNITARIO, false), 7, 'right'));
          itemProduto.push(layout(moedaFormatada(item.PEDF_VLR_TOTAL, false), 7, 'right'));
          linhaItens.push(itemProduto);
        }); // Itens



        const corpoProduto = [];
        corpoProduto.push({ text: '', border: [true, true, false, true] });
        corpoProduto.push({
          margin: [0, 0, 0, 0],
          layout: 'noBorders',
          header: 1,
          table: {
            widths: [40, '*', 35, 35, 35, 55, 55],
            body: linhaItens,
          },
          colSpan: 8,
          border: [false, true, true, true],
        });
        corpoProduto.push('');
        corpoProduto.push('');
        corpoProduto.push('');
        corpoProduto.push('');
        corpoProduto.push('');
        corpoProduto.push('');
        corpoProduto.push('');
        linhaRelatorio.push(corpoProduto);

      }) //Pedido

    }); // Geral


    const totalgeral = [];
    totalgeral.push(layout('TOTAL DO PERIODO', 7, 'left', true, '#ddd', 5));
    totalgeral.push('');
    totalgeral.push('');
    totalgeral.push('');
    totalgeral.push('');
    totalgeral.push(layout(moedaFormatada(retorno.totalizador.totalLitragem, false), 7, 'right', true, '#ddd'));
    totalgeral.push(layout(moedaFormatada(retorno.totalizador.qtdItens, false), 7, 'right', true, '#ddd'));
    totalgeral.push(layout('-', 7, 'center', true, '#ddd'));
    totalgeral.push(layout(moedaFormatada(retorno.totalizador.vlrTotal, false), 7, 'right', true, '#ddd'));
    linhaRelatorio.push(totalgeral);


    layoutDocumento.push({
      margin: [5, 5, 0, 0],
      header: 1,
      table: {
        widths: larguraCol,
        body: linhaRelatorio,
      },
    });

    return layoutDocumento;

  };


  function DefineDocumento(content) {

    const docDefinitions = {
      pageSize: 'A4',
      pageMargins: [10, 60, 14, 25],
      pageOrientation: 'portrait',
      defaultStyle: { font: 'Roboto' },
      header: header,
      content: content,
      footer: footer
    };

    return docDefinitions
  }


  function header() {

    return [

      {
        margin: [15, 10, 760, 10],

        table: {
          widths: [110, 320, 110, 320],

          //  c1,l1,c2,l2    
          body: [
            [
              { border: [true, true, true, false], text: '' },
              { border: [true, true, true, false], text: 'RELATÓRIO DE PEDIDOS POR CLIENTE', fontSize: 11, bold: true, alignment: 'center' },
              { border: [true, true, true, false], text: 'Usuário: CHARLES.SAIBWEB', bold: true, fontSize: 8 },
            ],
            [
              { border: [true, false, true, false], text: '' },
              { border: [true, false, true, false], text: 'Empresa: SAIBWEB IMPLANTAÇÃO', fontSize: 9, bold: true, alignment: 'left' },
              { border: [true, false, true, false], text: '' },
            ],
            [
              { border: [true, false, true, true], text: '' },
              { border: [true, false, true, true], text: 'Período: ' + dataFormatada(dtIni, "dd/mm/yyyy", false) + ' a ' + dataFormatada(dtFim, "dd/mm/yyyy", false), fontSize: 9, bold: true, alignment: 'left' },
              { border: [true, false, true, true], text: 'Emissão: ' + dataSys, bold: true, fontSize: 8 },
            ],
          ]
        },
      },
    ]
  }

  function footer(currentPage, pageCount) {

    return [
      {
        margin: [15, 5, 760, 10],

        table: {
          widths: [110, 320, 110, 320],

          body: [
            [
              { border: [false, false, false, false], text: '© Saibweb Tecnologia', fontSize: 7, bold: true, alignment: 'left' },
              { border: [false, false, false, false], text: '' },
              { border: [false, false, false, false], text: 'Página ' + currentPage.toString() + ' de ' + pageCount, fontSize: 7, bold: true, alignment: 'right' },
            ]
          ]
        }
      }
    ];
  }
}
