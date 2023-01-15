
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

//const semanas = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

export default function dataExtenso(data) {

  const formatData = data.replace(/(\d{2})(\/)(\d{2})/, "$3$2$1"); 

  const newData = new Date(formatData);

  //return newData.getDate() + ' ' + meses[newData.getMonth()] + ' (' +  days[newData.getDay()]+ ')';

  return newData.getDate() + ' de ' + 
         meses[newData.getMonth()] + ' de ' + 
         newData.getFullYear();
}
