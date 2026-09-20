/**
 * menu.js — melhorias de teclado para o menu do celular (hambúrguer em CSS).
 * O menu continua funcionando sem JavaScript; este arquivo apenas acrescenta:
 *  - Esc fecha o menu e devolve o foco ao botão;
 *  - escolher um link fecha o menu (útil nas âncoras da própria página);
 *  - o aria-label do botão acompanha o estado (abrir / fechar).
 */
export function iniciarMenu(doc = document) {
  const botao = doc.getElementById('menu-toggle');
  const navegacao = doc.querySelector('.nav-links');
  if (!botao || !navegacao) return null;

  const atualizarRotulo = () => {
    botao.setAttribute(
      'aria-label',
      botao.checked ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );
  };

  const fechar = () => {
    botao.checked = false;
    atualizarRotulo();
  };

  botao.addEventListener('change', atualizarRotulo);

  doc.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botao.checked) {
      fechar();
      botao.focus();
    }
  });

  navegacao.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) fechar();
  });

  return { fechar };
}

if (typeof document !== 'undefined') {
  iniciarMenu();
}
