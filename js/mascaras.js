/**
 * mascaras.js — máscaras de entrada (CPF, telefone e CEP) em JavaScript puro.
 * Uso: adicione data-mask="cpf | telefone | cep" ao <input>.
 */

const somenteDigitos = (valor) => String(valor).replace(/\D/g, '');

/** 000.000.000-00 */
export function mascaraCPF(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  let saida = d.slice(0, 3);
  if (d.length > 3) saida += '.' + d.slice(3, 6);
  if (d.length > 6) saida += '.' + d.slice(6, 9);
  if (d.length > 9) saida += '-' + d.slice(9, 11);
  return saida;
}

/** (00) 0000-0000 (fixo) ou (00) 00000-0000 (celular) */
export function mascaraTelefone(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return '(' + d;

  const resto = d.slice(2);
  const corte = d.length > 10 ? 5 : 4; // celular tem 9 dígitos após o DDD
  let saida = '(' + d.slice(0, 2) + ') ' + resto.slice(0, corte);
  if (resto.length > corte) saida += '-' + resto.slice(corte);
  return saida;
}

/** 00000-000 */
export function mascaraCEP(valor) {
  const d = somenteDigitos(valor).slice(0, 8);
  return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d;
}

const MASCARAS = {
  cpf: mascaraCPF,
  telefone: mascaraTelefone,
  cep: mascaraCEP,
};

export function aplicarMascaras(raiz = document) {
  raiz.querySelectorAll('[data-mask]').forEach((campo) => {
    const formatar = MASCARAS[campo.dataset.mask];
    if (!formatar) return;

    campo.addEventListener('input', () => {
      campo.value = formatar(campo.value);
    });
  });
}

if (typeof document !== 'undefined') {
  aplicarMascaras();
}
