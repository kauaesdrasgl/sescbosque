(function () {
    const ua = AppData.obterUltimaAtualizacao();
    const el = document.getElementById('ultima-atualizacao');
    if (ua && el) {
      el.textContent = 'Atualizado em ' + new Date(ua).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    } else if (el) {
      el.textContent = 'Dados carregados localmente';
    }
    // Escuta atualizações de outras abas
    window.addEventListener('storage', () => {
      const ua2 = AppData.obterUltimaAtualizacao();
      if (ua2 && el) {
        el.textContent = 'Atualizado em ' + new Date(ua2).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      }
    });
  })();