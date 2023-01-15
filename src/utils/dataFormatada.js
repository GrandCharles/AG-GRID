export default function dataFormatada(dt, mask, time) {

  var dta   = new Date(dt);
  var data  = dta.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  var dia   = data.substring(0,2).toString().padStart(2, '0');
  var mes   = data.substring(3,5).toString().padStart(2, '0');
  var ano   = data.substring(6,10);

/*
  var dia = data.getDate().toString().padStart(2, '0');
  var mes = (data.getMonth() + 1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
  var ano = data.getFullYear();
  var horas = data.getHours().toString().padStart(2, '0');
  var minutos = data.getMinutes().toString().padStart(2, '0');
  var segundos = data.getSeconds().toString().padStart(2, '0');
  var hhmmmss = [horas, minutos, segundos].join(':');
  var hhmmmss = [horas, minutos].join(':');
 */

  var dat="";
  if (mask === "yyyy-mm-dd") {
    dat =  [ano, mes, dia].join('-');
  } else if (mask === "dd-mm-yyyy") {
    dat = [dia, mes, ano].join('-');
  } else if (mask === "dd/mm/yyyy") {
    dat = [dia, mes, ano].join('/');
  }

  if (time) {
    dat = dat + ' ' + dta.toLocaleTimeString('pt-BR').substring(0,5);
  }

  return dat;
}

