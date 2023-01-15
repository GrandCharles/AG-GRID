import Excel from 'exceljs';
import * as fs from 'file-saver';
import moedaFormatada from '../../../../utils/moedaFormatada';
import dataFormatada from '../../../../utils/dataFormatada'

export default class GerarExcel {
    constructor(response, dtIni, dtFim) {
        this.dados = response;
        this.dtIni = dtIni;
        this.dtFim = dtFim;
    }

    async Imprimir() {
        const workbook = new Excel.Workbook();
        const sheetName = 'Folha_01';
        const fileName = 'PedidosPorCliente' + '.xlsx'
        const worksheet = workbook.addWorksheet(sheetName);
        const linhas = [];

        const { retorno } = this.dados;

        // Borda thin/medium
        const borda = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } }
        }
        // Alinhamento
        const alignCenter = { vertical: 'center', horizontal: 'center' };
        const alignRight = { vertical: 'center', horizontal: 'right' };

        // Neggrito
        const fontBold = { bold: true };

        // Preenchimento Cinza
        const fillGray = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD3D3D3' },
            bgColor: { argb: 'FFD3D3D3' }
        };
        // Preenchimento Azul
        const fillBlue = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFB0C4DE' },
            bgColor: { argb: 'FFB0C4DE' }
        };


        // Cabeçalho Principal
        worksheet.columns = [
            { key: 'nPed', header: "Nº Pedido", width: 15 },
            { key: 'oper', header: "Operação", width: 25 },
            { key: 'situ', header: "Situação", width: 30 },
            { key: 'nf', header: "Nota Fiscal", width: 30 },
            { key: 'dtCad', header: "Dt.Cadastro", width: 15 },
            { key: 'qtdLitro', header: "Qtd.Litros", width: 15 },
            { key: 'qtd', header: "Qtd", width: 15 },
            { key: 'vlrUnit', header: "Vlr.Unit.(R$)", width: 15 },
            { key: 'vlrTot', header: "Vlr.Total (R$)", width: 15 },
        ];

        // Borda
        worksheet.getCell('A1').border = borda;
        worksheet.getCell('B1').border = borda;
        worksheet.getCell('C1').border = borda;
        worksheet.getCell('D1').border = borda;
        worksheet.getCell('E1').border = borda;
        worksheet.getCell('F1').border = borda;
        worksheet.getCell('G1').border = borda;
        worksheet.getCell('H1').border = borda;
        worksheet.getCell('I1').border = borda;

        // Preenchimento
        worksheet.getCell('A1').fill = fillGray;
        worksheet.getCell('B1').fill = fillGray;
        worksheet.getCell('C1').fill = fillGray;
        worksheet.getCell('D1').fill = fillGray;
        worksheet.getCell('E1').fill = fillGray;
        worksheet.getCell('F1').fill = fillGray;
        worksheet.getCell('G1').fill = fillGray;
        worksheet.getCell('H1').fill = fillGray;
        worksheet.getCell('I1').fill = fillGray;

        worksheet.getCell('A1').alignment = alignCenter;
        worksheet.getCell('B1').alignment = alignCenter;
        worksheet.getCell('C1').alignment = alignCenter;
        worksheet.getCell('D1').alignment = alignCenter;
        worksheet.getCell('E1').alignment = alignCenter;
        worksheet.getCell('F1').alignment = alignCenter;
        worksheet.getCell('G1').alignment = alignCenter;
        worksheet.getCell('H1').alignment = alignCenter;
        worksheet.getCell('I1').alignment = alignCenter;

        let lin = 1;
        retorno.list.forEach((cli) => {
            lin = lin + 1;

            const cliente = [];
            cliente.push(cli.cliente);
            cliente.push('');
            cliente.push('');
            cliente.push('');
            cliente.push('');
            cliente.push(moedaFormatada(cli.totalizadores.totalLitragem, false),);
            cliente.push(moedaFormatada(cli.totalizadores.qtdItens, false));
            cliente.push('-');
            cliente.push(moedaFormatada(cli.totalizadores.vlrTotal, false));
            worksheet.addRow(cliente);

            // Mesclar Célula
            worksheet.mergeCells(`A${lin}:E${lin}`);

            // Preenchimento
            worksheet.getCell(`A${lin}:E${lin}`).fill = fillBlue;
            worksheet.getCell(`F${lin}`).fill = fillBlue;
            worksheet.getCell(`G${lin}`).fill = fillBlue;
            worksheet.getCell(`H${lin}`).fill = fillBlue;
            worksheet.getCell(`I${lin}`).fill = fillBlue;

            //Alinhamento
            worksheet.getCell(`F${lin}`).alignment = alignRight;
            worksheet.getCell(`G${lin}`).alignment = alignRight;
            worksheet.getCell(`H${lin}`).alignment = alignCenter;
            worksheet.getCell(`I${lin}`).alignment = alignRight;

            cli.pedidos.forEach((ped) => {
                lin = lin + 1;

                const pedido = [];
                pedido.push(ped.PEDF_ID);
                pedido.push(ped.OPFT_DESCR);
                pedido.push(ped.SITUACAO);
                pedido.push(ped.NUM_NF);
                pedido.push(dataFormatada(ped.PEDF_DTA_CAD, "dd/mm/yyyy", false));
                pedido.push(moedaFormatada(ped.totalizador.totalLitragem, false));
                pedido.push(moedaFormatada(ped.totalizador.qtdItens, false));
                pedido.push('-');
                pedido.push(moedaFormatada(ped.totalizador.vlrTotal, false));
                worksheet.addRow(pedido);

                //Alinhamento
                worksheet.getCell(`A${lin}`).alignment = alignCenter;
                worksheet.getCell(`C${lin}`).alignment = alignCenter;
                worksheet.getCell(`D${lin}`).alignment = alignCenter;
                worksheet.getCell(`E${lin}`).alignment = alignCenter;
                worksheet.getCell(`F${lin}`).alignment = alignRight;
                worksheet.getCell(`G${lin}`).alignment = alignRight;
                worksheet.getCell(`H${lin}`).alignment = alignCenter;
                worksheet.getCell(`I${lin}`).alignment = alignRight;

                // Cabeçalho Produtos
                lin = lin + 1;

                const cabItens = [];
                cabItens.push('');
                cabItens.push('');
                cabItens.push('#');
                cabItens.push('PRODUTO');
                cabItens.push('UND');
                cabItens.push('QTD.LITROS');
                cabItens.push('QTD');
                cabItens.push('VLR.UNIT.(R$)');
                cabItens.push('VLR.TOTAL(R$)');
                worksheet.addRow(cabItens);

                // Preenchimento
                worksheet.getCell(`C${lin}`).fill = fillGray;
                worksheet.getCell(`D${lin}`).fill = fillGray;
                worksheet.getCell(`E${lin}`).fill = fillGray;
                worksheet.getCell(`F${lin}`).fill = fillGray;
                worksheet.getCell(`G${lin}`).fill = fillGray;
                worksheet.getCell(`H${lin}`).fill = fillGray;
                worksheet.getCell(`I${lin}`).fill = fillGray;

                //Alinhamento
                worksheet.getCell(`C${lin}`).alignment = alignCenter;
                worksheet.getCell(`D${lin}`).alignment = alignCenter;
                worksheet.getCell(`E${lin}`).alignment = alignCenter;
                worksheet.getCell(`F${lin}`).alignment = alignCenter;
                worksheet.getCell(`G${lin}`).alignment = alignCenter;
                worksheet.getCell(`H${lin}`).alignment = alignCenter;
                worksheet.getCell(`I${lin}`).alignment = alignCenter;

                ped.itens.forEach((item) => {
                    lin = lin + 1;

                    const itens = [];
                    itens.push('');
                    itens.push('');
                    itens.push(item.PROD_ID);
                    itens.push(item.PROD_DESCR);
                    itens.push(item.PROD_UND_VDA);
                    itens.push(moedaFormatada(item.SUM_LITRAGEM, false));
                    itens.push(moedaFormatada(item.PEDF_QTDE, false));
                    itens.push(moedaFormatada(item.PEDF_VLR_UNITARIO, false));
                    itens.push(moedaFormatada(item.PEDF_VLR_TOTAL, false));
                    worksheet.addRow(itens);

                    // Mesclar Células
                    worksheet.mergeCells(`A${lin}:B${lin}`);

                    //Alinhamento
                    worksheet.getCell(`C${lin}`).alignment = alignCenter;
                    worksheet.getCell(`E${lin}`).alignment = alignCenter;
                    worksheet.getCell(`F${lin}`).alignment = alignRight;
                    worksheet.getCell(`G${lin}`).alignment = alignRight;
                    worksheet.getCell(`H${lin}`).alignment = alignRight;
                    worksheet.getCell(`I${lin}`).alignment = alignRight;
                })
            })
        })

        lin = lin + 1;
        const total = [];
        total.push('TOTAL NO PERÍODO');
        total.push('');
        total.push('');
        total.push('');
        total.push('');
        total.push(moedaFormatada(retorno.totalizador.totalLitragem, false));
        total.push(moedaFormatada(retorno.totalizador.qtdItens, false));
        total.push('-');
        total.push(moedaFormatada(retorno.totalizador.vlrTotal, false));
        worksheet.addRow(total);

        // Mesclar Células
        worksheet.mergeCells(`B${lin}:E${lin}`);

        // Preenchimento
        worksheet.getCell(`A${lin}`).fill = fillGray;
        worksheet.getCell(`B${lin}`).fill = fillGray;
        worksheet.getCell(`C${lin}`).fill = fillGray;
        worksheet.getCell(`D${lin}`).fill = fillGray;
        worksheet.getCell(`E${lin}`).fill = fillGray;
        worksheet.getCell(`F${lin}`).fill = fillGray;
        worksheet.getCell(`G${lin}`).fill = fillGray;
        worksheet.getCell(`H${lin}`).fill = fillGray;
        worksheet.getCell(`I${lin}`).fill = fillGray;


        //Alinhamento
        worksheet.getCell(`F${lin}`).alignment = alignRight;
        worksheet.getCell(`G${lin}`).alignment = alignRight;
        worksheet.getCell(`H${lin}`).alignment = alignCenter;
        worksheet.getCell(`I${lin}`).alignment = alignRight;

        // negrito
        worksheet.getCell(`A${lin}`).font = fontBold;
        worksheet.getCell(`F${lin}`).font = fontBold;
        worksheet.getCell(`G${lin}`).font = fontBold;
        worksheet.getCell(`H${lin}`).font = fontBold;
        worksheet.getCell(`I${lin}`).font = fontBold;


        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fileName);
        });

        return 'ola'
    }

}