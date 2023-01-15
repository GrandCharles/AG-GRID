import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moedaFormatada from '../../../../utils/moedaFormatada'
import dataFormatada from '../../../../utils/dataFormatada'


var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  },
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
}

const dataSys = dataFormatada(Date(), "dd/mm/yyyy", true);

export default function PdfPedido(retorno) {
  // const { retorno } = pedido  // capa , itens

  pdfMake.vfs = pdfFonts.pdfMake.vfs

  var pedf_qtde = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_QTDE); }, 0);
  var pedf_vlt_tab = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_VLR_TAB); }, 0);
  var pedf_base_icms = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_BASE_ICMS); }, 0);
  var pedf_vlr_icms = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_VLR_ICMS); }, 0);
  var pedf_base_subs = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_BASE_SUBS); }, 0);
  var pedf_vlr_subs = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_VLR_SUBS); }, 0);
  var pedf_vlr_ipi = retorno.itens.reduce((vlr, item) => { return (vlr + item.PEDF_VLR_IPI); }, 0);
  var vfcp = retorno.itens.reduce((vlr, item) => { return (vlr + item.VFCP); }, 0);
  var vfcpst = retorno.itens.reduce((vlr, item) => { return (vlr + item.VFCPST); }, 0);
  var vlr_mercadoria = retorno.itens.reduce((vlr, item) => { return (vlr + item.VLR_MERCADORIA); }, 0);

  const dadosItens = retorno.itens.map(ret => {


    return [

      { text: ret.PROD_ID, fontSize: 6, alignment: 'left' },
      { text: ret.PROD_COD_ORIGINAL, fontSize: 6, alignment: 'left' },
      { text: ret.PROD_DESCR, fontSize: 6, alignment: 'left' },
      { text: ret.PEDF_QTDE, fontSize: 6, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_VLR_UNITARIO, false), fontSize: 6, bold: true, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_BASE_ICMS, false), fontSize: 6, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_ALIQ_ICMS, false), fontSize: 6, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_VLR_ICMS, false), fontSize: 6, bold: true, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_BASE_SUBS, false), fontSize: 6, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_ALIQ_SUBS, false), fontSize: 6, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_VLR_SUBS, false), fontSize: 6, bold: true, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_ALIQ_IPI, false), fontSize: 6, alignment: 'right' },
      { text: moedaFormatada(ret.PEDF_VLR_IPI, false), fontSize: 6, bold: true, alignment: 'right' },
      { text: moedaFormatada(ret.VFCP, false), fontSize: 6, bold: true, alignment: 'right' },
      { text: moedaFormatada(ret.VFCPST, false), fontSize: 6, bold: true, alignment: 'right' },
      { text: moedaFormatada(ret.VLR_MERCADORIA, false), fontSize: 6, bold: true, alignment: 'right' }

    ]
    
  }
  );




  const details = [

    {
      margin: [-20, -8, 800, 0], // [left, top, right, bottom]

      table: {

        widths: [330, 150, 160, 100],

        body: [
          [
            { text: 'N.PEDIDO', fontSize: 7, alignment: 'left' },
            { text: 'N.GERADO', fontSize: 7, alignment: 'left' },
            { text: 'DATA EMISSÃO', fontSize: 7, alignment: 'left' },
            { text: 'FRETE', fontSize: 7, alignment: 'left' },
          ],
          [
            { text: retorno.capa.PEDF_ID, fontSize: 7, bold: true },
            { text: retorno.capa.PEDF_ID, fontSize: 7, bold: true },
            { text: dataFormatada(retorno.capa.PEDF_DTA_EMISS, "dd/mm/yyyy", false), fontSize: 7, bold: true },
            { text: retorno.capa.TIPO_FRETE, fontSize: 7, bold: true },
          ],
        ]

      },
      layout: 'noBorders'
    },

    //{ canvas: [{ type: 'rect', x: -20, y: 1, w: 803, h: 0 }] },
    {
      text: '_________________________________________________________________________________________________________________________________________________________________________________',
      alignment: 'left', fontSize: 10, bold: false, margin: [-20, 0, -30, 0]
    },

    {
      margin: [-20, 2, 800, 0], // [left, top, right, bottom]

      table: {

        widths: [330, 150, 160, 100],

        body: [
          [
            { text: 'CLIENTE', fontSize: 7, alignment: 'left' },
            { text: 'CNPJ/CPF', fontSize: 7, alignment: 'left' },
            { text: 'IE/RG', fontSize: 7, alignment: 'left' },
            { text: 'FONE', fontSize: 7, alignment: 'left' },
          ],
          [
            { text: retorno.capa.CLI_FANTASIA, fontSize: 7, bold: true },
            { text: retorno.capa.CLI_CNPJ_CPF, fontSize: 7, bold: true },
            { text: retorno.capa.CLI_INSC_EST, fontSize: 7, bold: true },
            { text: retorno.capa.FONE, fontSize: 7, bold: true },
          ],
          [
            { text: 'ENDEREÇO', fontSize: 7, alignment: 'left' },
            { text: 'CEP', fontSize: 7, alignment: 'left' },
            { text: 'BAIRRO', fontSize: 7, alignment: 'left' },
            { text: 'MUNICÍPIO', fontSize: 7, alignment: 'left' },
          ],
          [
            { text: retorno.capa.CLIE_ENDERECO, fontSize: 7, bold: true },
            { text: retorno.capa.CEP, fontSize: 7, bold: true },
            { text: retorno.capa.BAIRRO, fontSize: 7, bold: true },
            { text: retorno.capa.CIDADE, fontSize: 7, bold: true },
          ],
          [
            { text: 'CONDIÇÃO DE PAGAMENTO', fontSize: 7, alignment: 'left' },
            { text: 'FROTA', fontSize: 7, alignment: 'left' },
            { text: '', fontSize: 7, alignment: 'left' },
            { text: '', fontSize: 7, alignment: 'left' },
          ],
          [
            { text: retorno.capa.COND_PAGAMENTO, fontSize: 7, bold: true },
            { text: retorno.capa.FRO_RAZAO_SOCIAL, fontSize: 7, bold: true },
            { text: '', fontSize: 7, bold: true },
            { text: '', fontSize: 7, bold: true },
          ],
        ]

      },
      layout: 'noBorders'
    },

    //{ canvas: [{ type: 'rect', x: -20, y: 1, w: 803, h: 0 }] },
    {
      text: '_________________________________________________________________________________________________________________________________________________________________________________',
      alignment: 'left', fontSize: 10, bold: false, margin: [-20, -9, -30, 0]
    },


    {
      margin: [-20, 5, 800, 0], // [left, top, right, bottom]

      table: {
        headerRows: 1,
        //                                                            xx
        widths: [30, 35, 152, 15, 33, 30, 31, 27, 25, 25, 25, 20, 24, 25, 31, 31],  // Colunas '*' auto ajuste

        body: [
          [
            { text: 'CÓDIGO', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'left' },
            { text: 'CÓD.ORIG.', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'left' },
            { text: 'Produto', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'left' },
            { text: 'QTD', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR VENDA', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'BC ICMS', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'ALIQ ICMS', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR ICMS', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'BC ST.', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'ALIQ ST.', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR ST.', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: '% IPI', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR IPI', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR FCP', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR FCPST', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
            { text: 'VLR TOTAL', style: 'tableHeader', fontSize: 6, bold: true, alignment: 'right' },
          ],
          ...dadosItens
        ]
      },
      layout: 'headerLineOnly' //'noBorders', headerLineOnly' , 'lightHorizontalLines'
    },


    {
      margin: [-20, 10, 800, 0], // [left, top, right, bottom]

      table: {
        //                                                        X
        widths: [52, 12, 177, 15, 42, 38, 35, 37, 35, 30, 35, 25, 36, 33, 39, 39],  // Colunas '*' auto ajuste

        body: [
          [
            { text: 'TOTALIZADORES', fontSize: 6, bold: true, alignment: 'left', fillColor: '#CCCCCC' },
            { text: '', fontSize: 6, bold: true, alignment: 'left', fillColor: '#CCCCCC' },
            { text: '', fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: pedf_qtde, fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(pedf_vlt_tab, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(pedf_base_icms, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: '', fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(pedf_vlr_icms, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(pedf_base_subs, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: '', fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(pedf_vlr_subs, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: '', fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(pedf_vlr_ipi, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(vfcp, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(vfcpst, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
            { text: moedaFormatada(vlr_mercadoria, false), fontSize: 6, bold: true, alignment: 'right', fillColor: '#CCCCCC' },
          ],
        ]
      },
      layout: 'noBorders'
    },


    {
      margin: [-20, 5, 800, 0], // [left, top, right, bottom]

      table: {
        //                                                            X
        widths: [85, 705],

        body: [
          [
            { text: 'OBSERVAÇÃO PEDIDO:', fontSize: 8, bold: true, alignment: 'left' },
            { text: retorno.capa.PEDF_OBS_PED, fontSize: 8, bold: true, alignment: 'left' },
          ],
          [
            { text: 'OBSERVAÇÃO NOTA:', fontSize: 8, bold: true, alignment: 'left' },
            { text: retorno.capa.PEDF_OBS, fontSize: 8, bold: true, alignment: 'left' },
          ],
        ]
      },
      layout: 'noBorders'
    },
  ];


  function header() {

    return [

      {
        margin: [15, 10, 800, 10],

        table: {
          widths: [110, 555, 110, 555],

          body: [
            [
              { border: [true, true, false, false], text: '' },
              { border: [true, true, false, false], text: 'SAIBWEB IMPLANTAÇÃO', fontSize: 9, bold: true, alignment: 'center' },
              { border: [true, true, true, false], text: 'Usuário: CHARLES.SAIBWEB', bold: true, fontSize: 8 },
            ],
            [
              { border: [true, false, true, true], text: '' },
              { border: [true, false, true, true], text: 'IMPRESSÃO DO PEDIDO DE VENDA', fontSize: 11, bold: true, alignment: 'center' },
              { border: [true, false, true, true], text: 'Emissão: ' + dataSys, bold: true, fontSize: 8 },
            ],
          ]
        },
      },
    ]
  }


  function footer(currentPage, pageCount) {

    return [

      { canvas: [{ type: 'rect', x: 280, y: 1, w: 300, h: 0 }] },

      {
        margin: [20, 2, 760, 10], // [left, top, right, bottom]

        table: {
          widths: [800],

          body: [
            [
              { text: 'Assinatura', fontSize: 7, bold: true, alignment: 'center' },
            ]
          ]
        },
        layout: 'noBorders'
      },

      { canvas: [{ type: 'rect', x: 20, y: -5, w: 805, h: 0 }] },

      {
        margin: [20, -2, 760, 10], // [left, top, right, bottom]

        table: {
          widths: [800],

          body: [
            [
              { text: 'Página ' + currentPage.toString() + ' de ' + pageCount, fontSize: 7, bold: true, alignment: 'right' },
            ]
          ]
        },
        layout: 'noBorders'
      },

      {
        margin: [20, -10, 760, 10], // [left, top, right, bottom]

        table: {
          widths: [800],

          body: [
            [
              { text: '© Saibweb Tecnologia', fontSize: 7, bold: true, alignment: 'center' },
            ]
          ]
        },
        layout: 'noBorders'
      },

    ];
  }

  //{text: currentPage.toString() + ' de ' + pageCount},

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    pageOrientation: 'landscape',
    defaultStyle: { font: 'Roboto' },

    header: header,

    content: details,

    footer: footer

  };

  pdfMake.createPdf(docDefinitions, fonts).open();

}

