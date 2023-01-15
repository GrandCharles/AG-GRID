
export default function moedaFormatada(valor, cifra) {
  if (!valor ) {
    return "0,00"
  } else if (valor===0) {
    return "0,00"
  }

  if (cifra) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } else {
    return valor.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }
}
