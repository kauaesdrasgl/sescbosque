// ==================== DADOS ====================
const ESPACOS_PADRAO = [
    { id: 'e1', nome: 'Quadra Poliesportiva', capacidade: 200, categoria: 'Esporte', emoji: '🏀', descricao: 'Quadra coberta com piso emborrachado, arquibancada, iluminação LED e vestiários.', horarios: 'Seg–Sex: 7h–22h | Sáb: 8h–18h', antecedencia: 'Mín. 48h', fotos: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80'], regras: 'Traje adequado obrigatório. Chuteiras não permitidas.' },
    { id: 'e2', nome: 'Auditório Principal', capacidade: 150, categoria: 'Eventos', emoji: '🎤', descricao: 'Auditório climatizado com som profissional, projeção Full HD, palco e camarim.', horarios: 'Seg–Sex: 8h–21h', antecedencia: 'Mín. 72h', fotos: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80'], regras: 'Reserva sujeita à aprovação da gerência.' },
    { id: 'e3', nome: 'Auditório 2', capacidade: 60, categoria: 'Eventos', emoji: '📽️', descricao: 'Sala multiuso com TV interativa, videoconferência e mobiliário flexível.', horarios: 'Seg–Sex: 8h–18h', antecedencia: 'Mín. 48h', fotos: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80'], regras: 'Uso exclusivo para associados.' },
    { id: 'e4', nome: 'Salão de Festas', capacidade: 200, categoria: 'Eventos', emoji: '🎉', descricao: 'Salão elegante com cozinha industrial, sistema de som e estacionamento amplo.', horarios: 'Sáb: 8h–23h | Dom: 8h–20h', antecedencia: 'Mín. 7 dias', fotos: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80'], regras: 'Caução obrigatória. Limpeza responsabilidade do solicitante.' },
    { id: 'e5', nome: 'Campo Society', capacidade: 22, categoria: 'Esporte', emoji: '⚽', descricao: 'Campo gramado natural com iluminação noturna e vestiários.', horarios: 'Seg–Sex: 17h–22h | Sáb/Dom: 8h–22h', antecedencia: 'Mín. 24h', fotos: ['https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80'], regras: 'Apenas chuteiras de borracha.' },
    { id: 'e6', nome: 'Sala de Reuniões', capacidade: 20, categoria: 'Corporativo', emoji: '💼', descricao: 'Sala corporativa com projetor 4K, quadro interativo e Wi-Fi de alta velocidade.', horarios: 'Seg–Sex: 8h–18h', antecedencia: 'Mín. 24h', fotos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'], regras: 'Uso exclusivo para associados.' }
];

let espacos = [...ESPACOS_PADRAO];
let filtroAtual = 'todos';
let espacoSelecionado = null;
let passoAtual = 1;
let dataSelecionada = null;
let calMes = new Date().getMonth();
let calAno = new Date().getFullYear();

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS_S = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function getCategoriaCor(cat) {
    if (cat === 'Esporte') return 'azul';
    if (cat === 'Eventos') return 'roxo';
    return 'orange';
}

function renderizarEspacos() {
    const grid = document.getElementById('espacos-grid');
    const lista = filtroAtual === 'todos' ? espacos : espacos.filter(e => e.categoria === filtroAtual);
    grid.innerHTML = lista.map((e, i) => `
    <div class="espaco-card" style="transition-delay:${i * 0.05}s" onclick="abrirDrawer('${e.id}')">
      <div class="espaco-img">
        <img src="${e.fotos[0]}" alt="${e.nome}" loading="lazy">
        <div class="espaco-badge-cat"><span class="pill pill-${getCategoriaCor(e.categoria)}">${e.categoria}</span></div>
        <div class="espaco-cap-badge">👥 ${e.capacidade}</div>
        <div class="card-hover-cta">🔍 Ver detalhes</div>
      </div>
      <div class="espaco-body">
        <div class="espaco-name">${e.nome}</div>
        <div class="espaco-desc">${e.descricao.substring(0, 100)}...</div>
        <div class="espaco-meta"><div class="espaco-meta-item">🕒 ${e.horarios}</div><div class="espaco-meta-item">⏱️ ${e.antecedencia}</div></div>
        <div class="espaco-footer">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();abrirDrawer('${e.id}')">👁️ Detalhes</button>
          <button class="btn btn-verde btn-sm" onclick="event.stopPropagation();selecionarEspacoEReservar('${e.id}')">📋 Reservar</button>
        </div>
      </div>
    </div>
  `).join('');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('card-visible'); observer.unobserve(en.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.espaco-card').forEach(card => observer.observe(card));

    document.getElementById('stat-total').textContent = espacos.length;
}

function filtrar(cat, btn) {
    filtroAtual = cat;
    document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    renderizarEspacos();
    toast(`Filtrando: ${cat === 'todos' ? 'Todos os espaços' : cat}`, 'azul');
}

function abrirDrawer(id) {
    espacoSelecionado = espacos.find(e => e.id === id);
    if (!espacoSelecionado) return;
    document.getElementById('drawer-foto-img').src = espacoSelecionado.fotos[0];
    document.getElementById('drawer-cat-label').textContent = espacoSelecionado.categoria;
    document.getElementById('drawer-titulo').textContent = espacoSelecionado.nome;
    document.getElementById('drawer-desc').textContent = espacoSelecionado.descricao;
    document.getElementById('drawer-badges').innerHTML = `<span class="pill pill-${getCategoriaCor(espacoSelecionado.categoria)}">${espacoSelecionado.categoria}</span><span class="pill pill-verde">✓ Disponível</span>`;
    document.getElementById('drawer-specs').innerHTML = `
    <div class="drawer-spec"><div class="drawer-spec-icon">👥</div><div class="drawer-spec-label">Capacidade</div><div class="drawer-spec-val">${espacoSelecionado.capacidade} pessoas</div></div>
    <div class="drawer-spec"><div class="drawer-spec-icon">🕒</div><div class="drawer-spec-label">Horários</div><div class="drawer-spec-val">${espacoSelecionado.horarios}</div></div>`;
    document.getElementById('drawer-regras').style.display = 'block';
    document.getElementById('drawer-regras').innerHTML = `<strong>⚠️ Regras:</strong> ${espacoSelecionado.regras}`;
    document.getElementById('drawer-antec').textContent = espacoSelecionado.antecedencia;
    document.getElementById('drawer-overlay').classList.add('open');
    document.getElementById('drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function fecharDrawer() {
    document.getElementById('drawer-overlay').classList.remove('open');
    document.getElementById('drawer').classList.remove('open');
    document.body.style.overflow = '';
}

function selecionarEspacoEReservar(id) {
    espacoSelecionado = espacos.find(e => e.id === id);
    abrirFormulario();
}

function abrirFormulario() {
    if (!espacoSelecionado) return;
    passoAtual = 1;
    dataSelecionada = null;
    document.getElementById('modal-titulo').textContent = `Reserva — ${espacoSelecionado.nome}`;
    document.getElementById('form-espaco-nome').textContent = espacoSelecionado.nome;
    document.getElementById('form-espaco-info').textContent = `${espacoSelecionado.categoria} · Até ${espacoSelecionado.capacidade} pessoas`;
    document.getElementById('f-nome').value = '';
    document.getElementById('f-mat').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-tel').value = '';
    document.getElementById('f-pessoas').value = '';
    document.getElementById('f-obs').value = '';
    document.getElementById('sucesso-wrap').style.display = 'none';
    document.getElementById('resumo-wrap').style.display = 'block';
    document.getElementById('fs-erro-box').style.display = 'none';
    document.getElementById('data-chip').style.display = 'none';
    calMes = new Date().getMonth();
    calAno = new Date().getFullYear();
    renderizarPasso(1);
    document.getElementById('modal-formulario').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function fecharFormulario() {
    document.getElementById('modal-formulario').classList.remove('open');
    document.body.style.overflow = '';
}

function renderizarPasso(p) {
    passoAtual = p;
    [1, 2, 3].forEach(n => {
        document.getElementById(`passo${n}`).style.display = n === p ? 'block' : 'none';
        const circ = document.getElementById(`stp${n}`);
        const lbl = document.getElementById(`stp${n}-lbl`);
        circ.className = `stp-circle${n < p ? ' feito' : n === p ? ' ativo' : ''}`;
        lbl.className = `stp-label${n < p ? ' feito' : n === p ? ' ativo' : ''}`;
        if (n > 1) {
            const linha = document.getElementById(`linha${n === 2 ? '12' : '23'}`);
            if (linha) linha.className = `stp-linha${n <= p ? ' feita' : ''}`;
        }
    });
    document.getElementById('btn-voltar').style.display = p > 1 ? 'inline-flex' : 'none';
    const btnAv = document.getElementById('btn-avancar');
    btnAv.textContent = p === 3 ? '✅ Confirmar e Enviar' : 'Avançar →';
    if (p === 2) renderizarCalendario();
    if (p === 3) construirResumo();
}

function passoAvancar() {
    if (passoAtual === 1) { if (validarPasso1()) renderizarPasso(2); }
    else if (passoAtual === 2) { if (validarPasso2()) renderizarPasso(3); }
    else if (passoAtual === 3) { enviarSolicitacao(); }
}
function passoVoltar() { if (passoAtual > 1) renderizarPasso(passoAtual - 1); }

function validarPasso1() {
    if (!document.getElementById('f-nome').value.trim()) { toast('Preencha seu nome', 'azul'); return false; }
    if (document.getElementById('f-mat').value.trim().length !== 6) { toast('Matrícula deve ter 6 dígitos', 'azul'); return false; }
    if (!document.getElementById('f-email').value.includes('@')) { toast('E-mail inválido', 'azul'); return false; }
    return true;
}

function validarPasso2() {
    if (!dataSelecionada) { toast('Selecione uma data', 'azul'); return false; }
    if (!document.getElementById('f-hi').value || !document.getElementById('f-hf').value) { toast('Selecione horários', 'azul'); return false; }
    if (parseInt(document.getElementById('f-pessoas').value) > espacoSelecionado.capacidade) { toast(`Capacidade máxima: ${espacoSelecionado.capacidade}`, 'azul'); return false; }
    return true;
}

function construirResumo() {
    const [ano, mes, dia] = dataSelecionada.split('-');
    document.getElementById('resumo-content').innerHTML = `
    <div class="resumo-row"><span class="resumo-label">Espaço</span><span class="resumo-val">${espacoSelecionado.nome}</span></div>
    <div class="resumo-row"><span class="resumo-label">Data</span><span class="resumo-val">${dia}/${mes}/${ano}</span></div>
    <div class="resumo-row"><span class="resumo-label">Horário</span><span class="resumo-val">${document.getElementById('f-hi').value} às ${document.getElementById('f-hf').value}</span></div>
    <div class="resumo-row"><span class="resumo-label">Pessoas</span><span class="resumo-val">${document.getElementById('f-pessoas').value}</span></div>
    <div class="resumo-row"><span class="resumo-label">Solicitante</span><span class="resumo-val">${document.getElementById('f-nome').value}</span></div>`;
}

function enviarSolicitacao() {
    if (!document.getElementById('f-termos').checked) { toast('Aceite os termos', 'azul'); return; }
    const protocolo = 'SRP-' + Date.now().toString(36).toUpperCase();
    document.getElementById('resumo-wrap').style.display = 'none';
    document.getElementById('sucesso-wrap').style.display = 'block';
    document.getElementById('sucesso-protocolo').textContent = `Protocolo: ${protocolo}`;
    document.getElementById('modal-footer-btns').style.display = 'none';
    toast('✅ Solicitação enviada com sucesso!', 'verde');
}

function renderizarCalendario() {
    document.getElementById('cal-mes-titulo').textContent = `${MESES[calMes]} ${calAno}`;
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    let html = DIAS_S.map(d => `<div class="cal-header-dia">${d}</div>`).join('');
    const primeiroDia = new Date(calAno, calMes, 1).getDay();
    const totalDias = new Date(calAno, calMes + 1, 0).getDate();
    for (let i = 0; i < primeiroDia; i++) html += '<div class="cal-dia vazio"></div>';
    for (let d = 1; d <= totalDias; d++) {
        const dt = new Date(calAno, calMes, d);
        const passado = dt < hoje;
        const strData = `${calAno}-${String(calMes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const selecionado = dataSelecionada === strData;
        const classe = passado ? 'passado' : selecionado ? 'sel' : '';
        const onClick = !passado ? `onclick="selecionarData('${strData}', ${d})"` : '';
        html += `<div class="cal-dia ${classe}" ${onClick}>${d}</div>`;
    }
    document.getElementById('cal-grid').innerHTML = html;
}

function selecionarData(strData, dia) {
    dataSelecionada = strData;
    const [ano, mes] = strData.split('-');
    document.getElementById('data-chip-txt').textContent = `${String(dia).padStart(2, '0')}/${mes}/${ano} selecionado`;
    document.getElementById('data-chip').style.display = 'flex';
    renderizarCalendario();
}

function navCal(dir) {
    calMes += dir;
    if (calMes > 11) { calMes = 0; calAno++; }
    if (calMes < 0) { calMes = 11; calAno--; }
    renderizarCalendario();
}

function gerarHorarios() {
    const opts = ['<option value="">Selecione</option>'];
    for (let h = 7; h <= 22; h++) {
        opts.push(`<option value="${h}:00">${h}:00</option>`);
        opts.push(`<option value="${h}:30">${h}:30</option>`);
    }
    document.getElementById('f-hi').innerHTML = opts.join('');
    document.getElementById('f-hf').innerHTML = opts.join('');
}

function toggleTema() {
    const html = document.documentElement;
    const novo = html.getAttribute('data-tema') === 'claro' ? 'escuro' : 'claro';
    html.setAttribute('data-tema', novo);
    localStorage.setItem('sesc_tema', novo);
    const svg = document.getElementById('icon-tema');
    if (svg) {
        svg.innerHTML = novo === 'escuro'
            ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
            : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    }
}

function toast(msg, tipo) {
    const toastsDiv = document.getElementById('toasts');
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${tipo}`;
    toastEl.innerHTML = `<span>${tipo === 'verde' ? '✅' : 'ℹ️'}</span><span>${msg}</span>`;
    toastsDiv.appendChild(toastEl);
    setTimeout(() => {
        toastEl.classList.add('fadeout');
        setTimeout(() => toastEl.remove(), 300);
    }, 4000);
}

(function aplicarTemaSalvo() {
    const salvo = localStorage.getItem('sesc_tema');
    if (salvo === 'escuro') document.documentElement.setAttribute('data-tema', 'escuro');
    else document.documentElement.setAttribute('data-tema', 'claro');
})();

gerarHorarios();
renderizarEspacos();