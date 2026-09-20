/**
 * validacoes.js — validação acessível do formulário de cadastro.
 * - Complementa a validação nativa (required, pattern, type) com regras de negócio
 *   (dígitos verificadores do CPF, data de nascimento, formatos).
 * - Comunica erros por texto (role="alert") e por aria-invalid, nunca só por cor.
 * - Confirma o envio em um modal com gerenciamento de foco.
 */

const REGEX_TELEFONE = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const REGEX_CEP = /^\d{5}-\d{3}$/;

/** Valida CPF pelos dois dígitos verificadores. Aceita com ou sem máscara. */
export function validarCPF(cpf) {
  const d = String(cpf).replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;

  const digito = (quantidade) => {
    let soma = 0;
    for (let i = 0; i < quantidade; i += 1) {
      soma += Number(d[i]) * (quantidade + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

/** Data no formato AAAA-MM-DD, não futura e a partir de 1900. */
export function dataNascimentoValida(valor, hoje = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const data = new Date(`${valor}T00:00:00`);
  if (Number.isNaN(data.getTime())) return false;
  return data <= hoje && data.getFullYear() >= 1900;
}

/** Retorna a mensagem de erro do campo ou string vazia quando válido. */
export function mensagemDeErro(campo) {
  const valor = campo.value.trim();

  if (!valor) {
    return campo.tagName === 'SELECT' ? 'Selecione um estado.' : 'Preencha este campo.';
  }

  switch (campo.id) {
    case 'nome':
      return valor.split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : '';
    case 'nascimento':
      return dataNascimentoValida(valor) ? '' : 'Informe uma data de nascimento válida.';
    case 'cpf':
      return validarCPF(valor) ? '' : 'CPF inválido. Verifique os números digitados.';
    case 'email':
      return campo.validity.typeMismatch
        ? 'Informe um e-mail válido, como nome@exemplo.com.'
        : '';
    case 'telefone':
      return REGEX_TELEFONE.test(valor)
        ? ''
        : 'Informe o telefone no formato (00) 00000-0000.';
    case 'cep':
      return REGEX_CEP.test(valor) ? '' : 'Informe o CEP no formato 00000-000.';
    default:
      return '';
  }
}

export function iniciarFormulario(doc = document) {
  const form = doc.getElementById('form-cadastro');
  if (!form) return null;

  const campos = Array.from(form.querySelectorAll('.form-control'));
  const alertaSucesso = doc.getElementById('alerta-sucesso');
  const alertaErro = doc.getElementById('alerta-erro');
  const modal = doc.getElementById('modal-confirmacao');
  const toast = doc.getElementById('toast');
  const toastTexto = doc.getElementById('toast-texto');
  let ultimoFoco = null;
  let temporizadorToast = null;

  // Data de nascimento nunca no futuro
  const nascimento = doc.getElementById('nascimento');
  if (nascimento) nascimento.max = new Date().toISOString().slice(0, 10);

  /* ---------- Validação de campos ---------- */
  function validarCampo(campo) {
    const mensagem = mensagemDeErro(campo);
    const areaErro = doc.getElementById(`${campo.id}-erro`);
    if (areaErro) areaErro.textContent = mensagem;
    campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
    return mensagem === '';
  }

  function limparEstados() {
    campos.forEach((campo) => {
      campo.removeAttribute('aria-invalid');
      delete campo.dataset.tocado;
      const areaErro = doc.getElementById(`${campo.id}-erro`);
      if (areaErro) areaErro.textContent = '';
    });
  }

  campos.forEach((campo) => {
    // Só sinaliza erro depois que o usuário interagiu com o campo
    campo.addEventListener('blur', () => {
      campo.dataset.tocado = 'true';
      validarCampo(campo);
    });
    const revalidar = () => {
      if (campo.dataset.tocado) validarCampo(campo);
    };
    campo.addEventListener('input', revalidar);
    campo.addEventListener('change', revalidar);
  });

  /* ---------- Toast ---------- */
  function mostrarToast(texto) {
    toastTexto.textContent = texto;
    toast.hidden = false;
    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(() => { toast.hidden = true; }, 6000);
  }

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.hidden = true;
  });

  /* ---------- Modal (foco gerenciado) ---------- */
  const regioesDaPagina = () => doc.querySelectorAll('.skip-link, header, main, footer');

  function aoTeclar(evento) {
    if (evento.key === 'Escape') fecharModal();
  }

  function abrirModal() {
    ultimoFoco = doc.activeElement;
    regioesDaPagina().forEach((regiao) => { regiao.inert = true; });
    modal.hidden = false;
    modal.querySelector('[data-modal-confirmar]').focus();
    doc.addEventListener('keydown', aoTeclar);
  }

  function fecharModal() {
    modal.hidden = true;
    regioesDaPagina().forEach((regiao) => { regiao.inert = false; });
    doc.removeEventListener('keydown', aoTeclar);
    if (ultimoFoco) ultimoFoco.focus();
  }

  modal.querySelectorAll('[data-modal-cancelar]').forEach((botao) => {
    botao.addEventListener('click', fecharModal);
  });

  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) fecharModal();
  });

  modal.querySelector('[data-modal-confirmar]').addEventListener('click', () => {
    fecharModal();
    alertaSucesso.hidden = false;
    // Move o foco antes de limpar: o blur do último campo ainda vê valores válidos
    alertaSucesso.focus();
    form.reset();
    limparEstados();
    mostrarToast('Formulário enviado com sucesso!');
  });

  /* ---------- Envio ---------- */
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    alertaSucesso.hidden = true;

    const invalidos = campos.filter((campo) => !validarCampo(campo));

    if (invalidos.length > 0) {
      alertaErro.hidden = false;
      invalidos[0].focus();
      return;
    }

    alertaErro.hidden = true;
    abrirModal();
  });

  return { validarCampo, abrirModal, fecharModal };
}

if (typeof document !== 'undefined') {
  iniciarFormulario();
}
