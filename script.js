// ═══════════════════════════════════════════════════════
// SESC BOSQUE — script.js  (v2.0)
// Módulo de dados compartilhado. Carregado por TODAS as páginas.
// Funções de admin são protegidas por verificação de elemento DOM.
// Nenhuma requisição de rede. 100% offline via file://.
// ═══════════════════════════════════════════════════════

'use strict';

// ───────────────────────────────────────────────────────
// 1. DEFAULTS — embutidos aqui, NUNCA via fetch
// ───────────────────────────────────────────────────────
const MENU_PADRAO = {
  restaurante: {
    horario: 'Seg–Sex: 11h às 14h',
    categorias: ['Prato Principal', 'Acompanhamentos', 'Sobremesas', 'Bebidas'],
    itens: [
      { id: 'r1', nome: 'Frango Grelhado ao Limão', categoria: 'Prato Principal', descricao: 'Peito de frango grelhado com ervas finas e limão siciliano', precoPublico: 18.50, precoSesc: 14.80, disponivel: true, destaque: true, tags: ['Sem glúten', 'Proteico'], img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c4?w=400&q=80' },
      { id: 'r2', nome: 'Filé de Peixe Amazônico', categoria: 'Prato Principal', descricao: 'Filé de tambaqui grelhado ao molho de tucupi com pimenta-de-cheiro', precoPublico: 22.00, precoSesc: 17.60, disponivel: true, destaque: true, tags: ['Regional', 'Sem glúten'], img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
      { id: 'r3', nome: 'Carne Assada ao Molho Pardo', categoria: 'Prato Principal', descricao: 'Paleta bovina assada lentamente com batatas e legumes', precoPublico: 20.00, precoSesc: 16.00, disponivel: true, destaque: false, tags: ['Proteico'], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
      { id: 'r4', nome: 'Arroz Branco', categoria: 'Acompanhamentos', descricao: 'Arroz soltinho temperado com alho e sal', precoPublico: 4.00, precoSesc: 3.20, disponivel: true, destaque: false, tags: ['Vegano'], img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80' },
      { id: 'r5', nome: 'Feijão Tropeiro', categoria: 'Acompanhamentos', descricao: 'Feijão carioca com bacon e farinha de mandioca', precoPublico: 5.50, precoSesc: 4.40, disponivel: true, destaque: false, tags: ['Regional'], img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
      { id: 'r6', nome: 'Salada da Horta', categoria: 'Acompanhamentos', descricao: 'Mix de folhas verdes com tomate e pepino', precoPublico: 6.00, precoSesc: 4.80, disponivel: true, destaque: false, tags: ['Vegano', 'Sem glúten'], img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
      { id: 'r7', nome: 'Pudim de Leite', categoria: 'Sobremesas', descricao: 'Pudim cremoso com calda de caramelo dourado', precoPublico: 7.00, precoSesc: 5.60, disponivel: true, destaque: false, tags: [], img: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80' },
      { id: 'r8', nome: 'Suco de Cupuaçu', categoria: 'Bebidas', descricao: 'Suco natural de cupuaçu amazônico', precoPublico: 5.00, precoSesc: 4.00, disponivel: true, destaque: false, tags: ['Vegano', 'Regional'], img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
      { id: 'r9', nome: 'Água Mineral', categoria: 'Bebidas', descricao: 'Água mineral sem gás 500ml', precoPublico: 2.50, precoSesc: 2.00, disponivel: true, destaque: false, tags: ['Vegano'], img: 'https://images.unsplash.com/photo-1550505095-81378a674395?w=400&q=80' },
    ]
  },
  lanchonete: {
    horario: 'Seg–Sex: 8h–17h | Sáb: 8h–13h',
    categorias: ['Lanches', 'Salgados', 'Sucos & Vitaminas', 'Café & Bebidas', 'Doces & Bolos'],
    itens: [
      { id: 'l1', nome: 'X-Sesc Especial', categoria: 'Lanches', descricao: 'Hambúrguer artesanal com queijo e molho especial', precoPublico: 14.00, precoSesc: 11.20, disponivel: true, destaque: true, tags: [], img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
      { id: 'l2', nome: 'Misto Quente', categoria: 'Lanches', descricao: 'Presunto e queijo grelhado na chapa', precoPublico: 8.00, precoSesc: 6.40, disponivel: true, destaque: false, tags: [], img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80' },
      { id: 'l3', nome: 'Coxinha de Frango', categoria: 'Salgados', descricao: 'Coxinha crocante com frango e catupiry', precoPublico: 4.50, precoSesc: 3.60, disponivel: true, destaque: false, tags: [], img: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=400&q=80' },
      { id: 'l4', nome: 'Pão de Queijo', categoria: 'Salgados', descricao: 'Pão de queijo artesanal quentinho', precoPublico: 3.50, precoSesc: 2.80, disponivel: true, destaque: false, tags: ['Sem glúten'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { id: 'l5', nome: 'Vitamina de Açaí', categoria: 'Sucos & Vitaminas', descricao: 'Açaí com banana, granola e mel', precoPublico: 9.00, precoSesc: 7.20, disponivel: true, destaque: true, tags: ['Vegano', 'Regional'], img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80' },
      { id: 'l6', nome: 'Suco de Graviola', categoria: 'Sucos & Vitaminas', descricao: 'Suco natural de graviola', precoPublico: 7.00, precoSesc: 5.60, disponivel: true, destaque: false, tags: ['Regional'], img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
      { id: 'l7', nome: 'Café Expresso', categoria: 'Café & Bebidas', descricao: '100% arábica torrado na hora', precoPublico: 4.00, precoSesc: 3.20, disponivel: true, destaque: false, tags: ['Vegano'], img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80' },
      { id: 'l8', nome: 'Cappuccino', categoria: 'Café & Bebidas', descricao: 'Espresso com leite vaporizado e espuma', precoPublico: 6.50, precoSesc: 5.20, disponivel: true, destaque: false, tags: [], img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80' },
      { id: 'l9', nome: 'Bolo de Macaxeira', categoria: 'Doces & Bolos', descricao: 'Bolo de mandioca com coco e calda de leite', precoPublico: 6.50, precoSesc: 5.20, disponivel: true, destaque: false, tags: ['Regional'], img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&q=80' },
    ]
  }
};

const ESPACOS_PADRAO = [
  { id: 'e1', nome: 'Quadra Poliesportiva', capacidade: 200, categoria: 'Esporte', descricao: 'Quadra coberta para futebol de salão, basquete e vôlei.', regras: 'Trajar adequado obrigatório.', horarios: 'Seg–Sex: 7h–22h | Sáb: 8h–18h | Dom: 8h–14h', antecedencia: 'Mín. 48h de antecedência', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80' },
  { id: 'e2', nome: 'Auditório Principal', capacidade: 150, categoria: 'Eventos', descricao: 'Auditório climatizado com sistema de som profissional.', regras: 'Alimentação não permitida.', horarios: 'Seg–Sex: 8h–21h | Sáb: 8h–16h', antecedencia: 'Mín. 72h de antecedência', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80' },
  { id: 'e3', nome: 'Salão de Festas', capacidade: 100, categoria: 'Eventos', descricao: 'Salão decorado com cozinha integrada.', regras: 'Limpeza é responsabilidade do solicitante.', horarios: 'Sáb e Dom: 8h–23h', antecedencia: 'Mín. 7 dias de antecedência', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80' },
  { id: 'e4', nome: 'Campo Society', capacidade: 22, categoria: 'Esporte', descricao: 'Campo gramado com iluminação LED.', regras: 'Apenas chuteiras de borracha.', horarios: 'Seg–Sex: 17h–22h | Sáb: 8h–22h', antecedencia: 'Mín. 24h de antecedência', img: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&q=80' },
  { id: 'e5', nome: 'Sala de Reuniões A', capacidade: 20, categoria: 'Corporativo', descricao: 'Sala com projetor 4K e quadro branco.', regras: 'Uso exclusivo para associados.', horarios: 'Seg–Sex: 8h–18h', antecedencia: 'Mín. 24h de antecedência', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
];

const USUARIOS_PADRAO = {
  '123456': { senha: 'sesc2024', nome: 'João da Silva Santos', tipo: 'Titular', perfil: 'user', ativo: true },
  '234567': { senha: 'dep2024', nome: 'Maria Aparecida Lima', tipo: 'Dependente', perfil: 'user', ativo: true },
  '345678': { senha: 'car2024', nome: 'Carlos Eduardo Souza', tipo: 'Titular', perfil: 'user', ativo: true },
  '456789': { senha: 'ana2024', nome: 'Ana Paula Costa', tipo: 'Titular', perfil: 'user', ativo: false },
  '999999': { senha: 'admin123', nome: 'Administrador Sesc', tipo: 'Admin', perfil: 'admin', ativo: true },
};

// ───────────────────────────────────────────────────────
// 2. ESTADO GLOBAL
// ───────────────────────────────────────────────────────
let MENU_DATA = JSON.parse(JSON.stringify(MENU_PADRAO));
let ESPACOS    = JSON.parse(JSON.stringify(ESPACOS_PADRAO));
let USUARIOS   = JSON.parse(JSON.stringify(USUARIOS_PADRAO));
let SOLICITACOES = [];

// Admin state
let cardSubAba = 'restaurante';
let tvAtual = 0, tvTimer = null, tvPausado = false, tvItens = [];
let APP_ADMIN = { usuario: null };

// ───────────────────────────────────────────────────────
// 3. AppData — módulo de persistência público
// ───────────────────────────────────────────────────────
const AppData = {
  /** Carrega e retorna todos os dados (localStorage ou DEFAULTS) */
  carregar() {
    carregarTudo();
    return { menu: MENU_DATA, espacos: ESPACOS, usuarios: USUARIOS, solicitacoes: SOLICITACOES };
  },
  /** Salva parcialmente (passa apenas o que mudou) */
  salvar(dados) {
    if (dados && dados.menu)         MENU_DATA    = dados.menu;
    if (dados && dados.espacos)      ESPACOS      = dados.espacos;
    if (dados && dados.usuarios)     USUARIOS     = dados.usuarios;
    if (dados && dados.solicitacoes) SOLICITACOES = dados.solicitacoes;
    salvarTudo();
  },
  /** Reseta tudo para os dados padrão */
  resetar() {
    MENU_DATA    = JSON.parse(JSON.stringify(MENU_PADRAO));
    ESPACOS      = JSON.parse(JSON.stringify(ESPACOS_PADRAO));
    USUARIOS     = JSON.parse(JSON.stringify(USUARIOS_PADRAO));
    SOLICITACOES = [];
    salvarTudo();
    console.log('[AppData] Reset para DEFAULTS concluído.');
  },
  /** ISO string da última atualização */
  obterUltimaAtualizacao() {
    try {
      const meta = localStorage.getItem('sesc_meta');
      if (meta) return JSON.parse(meta).ultimaAtualizacao;
    } catch(e) {}
    return null;
  }
};

// ───────────────────────────────────────────────────────
// 4. PERSISTÊNCIA
// ───────────────────────────────────────────────────────
function carregarTudo() {
  try {
    // Migração de chaves legadas
    const legadas = { sesc_cardapio_v2: 'sesc_menu', sesc_espacos_v2: 'sesc_espacos' };
    Object.entries(legadas).forEach(([antiga, nova]) => {
      const val = localStorage.getItem(antiga);
      if (val) {
        console.log('[AppData] Migrando chave legada:', antiga, '→', nova);
        if (!localStorage.getItem(nova)) localStorage.setItem(nova, val);
        localStorage.removeItem(antiga);
      }
    });

    const menu = localStorage.getItem('sesc_menu');
    if (menu) {
      const p = JSON.parse(menu);
      if (p.restaurante) MENU_DATA.restaurante = Object.assign({}, MENU_DATA.restaurante, p.restaurante);
      if (p.lanchonete)  MENU_DATA.lanchonete  = Object.assign({}, MENU_DATA.lanchonete,  p.lanchonete);
    }
    const esp = localStorage.getItem('sesc_espacos');
    if (esp) ESPACOS = JSON.parse(esp);

    const usr = localStorage.getItem('sesc_usuarios'); // ← bug corrigido: era `usr` sem declaração
    if (usr) USUARIOS = JSON.parse(usr);

    const sols = localStorage.getItem('sesc_solicitacoes');
    if (sols) SOLICITACOES = JSON.parse(sols);
  } catch (e) {
    console.warn('[AppData] Erro ao carregar dados:', e);
  }
}

function salvarTudo() {
  try {
    localStorage.setItem('sesc_menu',         JSON.stringify(MENU_DATA));
    localStorage.setItem('sesc_espacos',      JSON.stringify(ESPACOS));
    localStorage.setItem('sesc_usuarios',     JSON.stringify(USUARIOS));
    localStorage.setItem('sesc_solicitacoes', JSON.stringify(SOLICITACOES));
    localStorage.setItem('sesc_meta', JSON.stringify({
      ultimaAtualizacao: new Date().toISOString(),
      versao: '2.0'
    }));
    // Evento para sincronização entre abas (opcional)
    try { window.dispatchEvent(new CustomEvent('dataAtualizada')); } catch(e) {}
  } catch (e) {
    console.warn('[AppData] Erro ao salvar dados:', e);
  }
}

// ───────────────────────────────────────────────────────
// 5. AUTH ADMIN
// ───────────────────────────────────────────────────────
function fazerLoginAdmin() {
  const matEl = document.getElementById('adm-mat');
  const senhaEl = document.getElementById('adm-senha');
  if (!matEl || !senhaEl) return;
  const mat = matEl.value.trim();
  const senha = senhaEl.value;
  const errMat = document.getElementById('err-adm-mat');
  const errSenha = document.getElementById('err-adm-senha');
  if (errMat) errMat.style.display = 'none';
  if (errSenha) errSenha.style.display = 'none';
  const user = USUARIOS[mat];
  if (!user || user.perfil !== 'admin') { if (errMat) errMat.style.display = 'flex'; return; }
  if (user.senha !== senha) { if (errSenha) errSenha.style.display = 'flex'; return; }
  APP_ADMIN.usuario = { mat, ...user };
  const loginEl = document.getElementById('admin-login');
  const panelEl = document.getElementById('admin-panel');
  if (loginEl) loginEl.style.display = 'none';
  if (panelEl) panelEl.style.display = 'block';
  const primeiraTab = document.querySelector('.admin-tab');
  mudarTab('relatorios', primeiraTab);
  toast(`Bem-vindo, ${user.nome.split(' ')[0]}!`, 'verde');
}

function sairAdmin() {
  APP_ADMIN.usuario = null;
  const loginEl = document.getElementById('admin-login');
  const panelEl = document.getElementById('admin-panel');
  if (panelEl) panelEl.style.display = 'none';
  if (loginEl) loginEl.style.display = 'flex';
  const matEl = document.getElementById('adm-mat');
  const senhaEl = document.getElementById('adm-senha');
  if (matEl) matEl.value = '';
  if (senhaEl) senhaEl.value = '';
}

// ───────────────────────────────────────────────────────
// 6. NAVEGAÇÃO TABS (admin)
// ───────────────────────────────────────────────────────
function mudarTab(aba, btn) {
  ['relatorios', 'cardapio', 'espacos', 'agendamentos', 'usuarios', 'tv'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.style.display = t === aba ? 'block' : 'none';
  });
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('ativo'));
  if (btn) btn.classList.add('ativo');
  if (aba === 'relatorios')   renderRelatorios();
  if (aba === 'cardapio')     renderCardapio();
  if (aba === 'espacos')      renderEspacos();
  if (aba === 'agendamentos') renderAgendamentos();
  if (aba === 'usuarios')     renderUsuarios();
  if (aba === 'tv')           { renderTVPreview(); iniciarTV(); }
}

function mudarSubAba(aba, btn) {
  cardSubAba = aba;
  document.querySelectorAll('.admin-tab-sub').forEach(b => b.classList.remove('ativo'));
  if (btn) btn.classList.add('ativo');
  renderCardapio();
}

// ───────────────────────────────────────────────────────
// 7. RELATÓRIOS
// ───────────────────────────────────────────────────────
function renderRelatorios() {
  const todos = [...MENU_DATA.restaurante.itens, ...MENU_DATA.lanchonete.itens];
  const pendentes  = SOLICITACOES.filter(s => s.status === 'Pendente').length;
  const aprovados  = SOLICITACOES.filter(s => s.status === 'Aprovado').length;
  const receitaEst = SOLICITACOES.filter(s => s.status !== 'Recusado').length * 48;

  const lastEl = document.getElementById('last-updated');
  if (lastEl) lastEl.textContent = 'Atualizado em ' + new Date().toLocaleString('pt-BR');

  const metEl = document.getElementById('metricas-grid');
  if (metEl) metEl.innerHTML = `
    <div class="metrica-card"><div class="metrica-val">${todos.length}</div><div class="metrica-label">Total de itens</div><div class="metrica-sub">Restaurante + Lanchonete</div></div>
    <div class="metrica-card"><div class="metrica-val" style="color:var(--amar-e)">${pendentes}</div><div class="metrica-label">Aguardando aprovação</div><div class="metrica-sub">Agendamentos pendentes</div></div>
    <div class="metrica-card"><div class="metrica-val" style="color:var(--verde)">${aprovados}</div><div class="metrica-label">Aprovados no mês</div><div class="metrica-sub">Agendamentos confirmados</div></div>
    <div class="metrica-card"><div class="metrica-val" style="color:var(--azul)">R$ ${receitaEst}</div><div class="metrica-label">Receita estimada</div><div class="metrica-sub">Baseado em mensalidade média</div></div>
    <div class="metrica-card"><div class="metrica-val" style="color:var(--roxo)">${Object.keys(USUARIOS).length}</div><div class="metrica-label">Usuários cadastrados</div></div>
    <div class="metrica-card"><div class="metrica-val" style="color:var(--orange)">${ESPACOS.length}</div><div class="metrica-label">Espaços disponíveis</div></div>
  `;

  const destaques = todos.filter(i => i.destaque);
  const destEl = document.getElementById('destaque-tbody');
  if (destEl) destEl.innerHTML = destaques.length ? destaques.map(item => {
    const pub = item.precoPublico ?? 0; const sesc = item.precoSesc ?? pub;
    const desc = pub > 0 ? Math.round((1 - sesc / pub) * 100) : 0;
    const aba = MENU_DATA.restaurante.itens.find(i2 => i2.id === item.id) ? 'Restaurante' : 'Lanchonete';
    return `<tr>
      <td><img src="${item.img}" style="width:42px;height:42px;object-fit:cover;border-radius:var(--r1)" alt="${item.nome}"></td>
      <td style="font-weight:600">${item.nome}</td>
      <td><span class="pill ${aba === 'Restaurante' ? 'pill-azul' : 'pill-amar'}">${aba}</span></td>
      <td style="text-decoration:line-through;color:var(--text-4)">R$ ${pub.toFixed(2).replace('.', ',')}</td>
      <td style="font-weight:700;color:var(--verde)">R$ ${sesc.toFixed(2).replace('.', ',')}</td>
      <td><span class="pill pill-verde">-${desc}%</span></td>
    </tr>`;
  }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--text-4);padding:1.5rem">Nenhum item em destaque.</td></tr>';

  const svg = document.getElementById('chart-svg');
  if (svg) {
    const data = ESPACOS.slice(0, 5).map(e => ({
      nome: e.nome.split(' ')[0],
      val: SOLICITACOES.filter(s => s.espaco === e.nome).length || Math.floor(Math.random() * 20 + 2)
    }));
    const maxVal = Math.max(...data.map(d => d.val), 1);
    const barW = 70, gap = 100, startX = 80, barMaxH = 130;
    svg.innerHTML = `<line x1="60" y1="10" x2="60" y2="180" stroke="var(--border)" stroke-width="1"/>
    <line x1="60" y1="180" x2="620" y2="180" stroke="var(--border)" stroke-width="1"/>` +
      data.map((d, i) => {
        const bh = Math.round((d.val / maxVal) * barMaxH);
        const x = startX + i * gap;
        return `<rect x="${x}" y="${180 - bh}" width="${barW}" height="${bh}" rx="6" fill="var(--azul)" opacity="${.55 + i * .1}"/>
        <text x="${x + barW / 2}" y="198" text-anchor="middle" font-size="10" fill="var(--text-4)" font-family="Outfit,sans-serif">${d.nome}</text>
        <text x="${x + barW / 2}" y="${180 - bh - 6}" text-anchor="middle" font-size="11" fill="var(--azul)" font-weight="700" font-family="Outfit,sans-serif">${d.val}</text>`;
      }).join('');
  }
}

// ───────────────────────────────────────────────────────
// 8. CARDÁPIO (admin)
// ───────────────────────────────────────────────────────
function renderCardapio() {
  const itens = MENU_DATA[cardSubAba].itens;
  const titleEl = document.getElementById('card-table-title');
  const countEl = document.getElementById('card-table-count');
  const tbodyEl = document.getElementById('card-tbody');
  if (!tbodyEl) return;
  if (titleEl) titleEl.textContent = cardSubAba === 'restaurante' ? 'Restaurante' : 'Lanchonete';
  if (countEl) countEl.textContent = itens.length + ' itens';
  tbodyEl.innerHTML = itens.map(item => {
    const pub = item.precoPublico ?? item.preco ?? 0;
    const sesc = item.precoSesc ?? pub;
    const desc = pub > 0 ? Math.round((1 - sesc / pub) * 100) : 0;
    return `<tr>
      <td><img src="${item.img}" style="width:46px;height:46px;object-fit:cover;border-radius:var(--r1)" alt="${item.nome}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'"></td>
      <td><span style="font-weight:600;color:var(--text-1)">${item.nome}</span><br><span style="font-size:.72rem;color:var(--text-4)">${item.categoria}</span></td>
      <td><div class="price-dual"><span class="price-sesc">R$ ${sesc.toFixed(2).replace('.', ',')}</span>${desc > 0 ? `<span class="price-public">R$ ${pub.toFixed(2).replace('.', ',')}</span><span class="price-badge">-${desc}%</span>` : ''}</div></td>
      <td><label class="toggle-sw"><input type="checkbox" ${item.disponivel ? 'checked' : ''} onchange="toggleItem('${item.id}',this.checked,'disponivel')"><span class="toggle-slider"></span></label></td>
      <td><label class="toggle-sw"><input type="checkbox" ${item.destaque ? 'checked' : ''} onchange="toggleItem('${item.id}',this.checked,'destaque')"><span class="toggle-slider"></span></label></td>
      <td><div style="display:flex;gap:.35rem">
        <button class="btn-icon" onclick="abrirModalItem('${item.id}')" title="Editar"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="btn-icon" style="background:var(--red-p);color:var(--red);border-color:var(--red)" onclick="confirmar('Excluir este item do cardápio?',()=>excluirItem('${item.id}'))" title="Excluir"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--text-4);padding:2rem">Nenhum item cadastrado.</td></tr>';
}

function toggleItem(id, val, campo) {
  const aba = MENU_DATA.restaurante.itens.find(i => i.id === id) ? 'restaurante' : 'lanchonete';
  const item = MENU_DATA[aba].itens.find(i => i.id === id);
  if (item) { item[campo] = val; salvarTudo(); toast(`${item.nome}: ${campo} atualizado`, 'azul'); }
}

function excluirItem(id) {
  for (const aba of ['restaurante', 'lanchonete']) {
    const idx = MENU_DATA[aba].itens.findIndex(i => i.id === id);
    if (idx !== -1) {
      const nome = MENU_DATA[aba].itens[idx].nome;
      MENU_DATA[aba].itens.splice(idx, 1);
      salvarTudo(); renderCardapio();
      toast(`"${nome}" removido`, 'red'); return;
    }
  }
}

function abrirModalItem(id) {
  const isNovo = !id;
  const titleEl = document.getElementById('modal-item-title');
  const editIdEl = document.getElementById('item-edit-id');
  if (titleEl) titleEl.textContent = isNovo ? 'Novo Item' : 'Editar Item';
  if (editIdEl) editIdEl.value = id || '';
  atualizarCatsSelect('restaurante');
  if (isNovo) {
    ['item-nome', 'item-desc', 'item-img', 'item-tags'].forEach(f => { const el = document.getElementById(f); if (el) el.value = ''; });
    const ppEl = document.getElementById('item-preco-pub'); if (ppEl) ppEl.value = '';
    const psEl = document.getElementById('item-preco-sesc'); if (psEl) psEl.value = '';
    const dispEl = document.getElementById('item-disponivel'); if (dispEl) dispEl.checked = true;
    const destEl = document.getElementById('item-destaque'); if (destEl) destEl.checked = false;
    const abaEl = document.getElementById('item-aba'); if (abaEl) abaEl.value = 'restaurante';
  } else {
    const aba = MENU_DATA.restaurante.itens.find(i => i.id === id) ? 'restaurante' : 'lanchonete';
    const item = MENU_DATA[aba].itens.find(i => i.id === id);
    const abaEl = document.getElementById('item-aba'); if (abaEl) abaEl.value = aba;
    atualizarCatsSelect(aba);
    const catEl = document.getElementById('item-cat'); if (catEl) catEl.value = item.categoria;
    const nomeEl = document.getElementById('item-nome'); if (nomeEl) nomeEl.value = item.nome;
    const descEl = document.getElementById('item-desc'); if (descEl) descEl.value = item.descricao;
    const ppEl = document.getElementById('item-preco-pub'); if (ppEl) ppEl.value = item.precoPublico ?? item.preco ?? '';
    const psEl = document.getElementById('item-preco-sesc'); if (psEl) psEl.value = item.precoSesc ?? '';
    const imgEl = document.getElementById('item-img'); if (imgEl) imgEl.value = item.img;
    const tagsEl = document.getElementById('item-tags'); if (tagsEl) tagsEl.value = item.tags.join(', ');
    const dispEl = document.getElementById('item-disponivel'); if (dispEl) dispEl.checked = item.disponivel;
    const destEl = document.getElementById('item-destaque'); if (destEl) destEl.checked = item.destaque;
    const editAbaEl = document.getElementById('item-edit-aba'); if (editAbaEl) editAbaEl.value = aba;
  }
  abrirModal('modal-item');
}

function atualizarCatsSelect(aba) {
  const catEl = document.getElementById('item-cat');
  if (!catEl) return;
  const cats = MENU_DATA[aba].categorias;
  catEl.innerHTML = cats.map(c => `<option>${c}</option>`).join('');
}

function salvarItem() {
  const id = document.getElementById('item-edit-id')?.value;
  const aba = document.getElementById('item-aba')?.value;
  const nome = document.getElementById('item-nome')?.value.trim();
  const cat = document.getElementById('item-cat')?.value;
  const desc = document.getElementById('item-desc')?.value.trim();
  const pub = parseFloat(document.getElementById('item-preco-pub')?.value);
  const sesc = parseFloat(document.getElementById('item-preco-sesc')?.value);
  if (!nome || !desc || isNaN(pub) || isNaN(sesc)) { toast('Preencha todos os campos obrigatórios', 'red'); return; }
  const tags = (document.getElementById('item-tags')?.value || '').split(',').map(t => t.trim()).filter(Boolean);
  const obj = {
    id: id || aba[0] + Date.now().toString(36),
    nome, categoria: cat, descricao: desc,
    precoPublico: pub, precoSesc: sesc,
    disponivel: document.getElementById('item-disponivel')?.checked ?? true,
    destaque: document.getElementById('item-destaque')?.checked ?? false,
    tags, img: document.getElementById('item-img')?.value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  };
  if (id) {
    const oldAba = document.getElementById('item-edit-aba')?.value;
    const idx = MENU_DATA[oldAba].itens.findIndex(i => i.id === id);
    if (idx !== -1) {
      if (oldAba !== aba) { MENU_DATA[oldAba].itens.splice(idx, 1); MENU_DATA[aba].itens.push(obj); }
      else MENU_DATA[aba].itens[idx] = obj;
    }
    toast('Item atualizado!', 'verde');
  } else {
    MENU_DATA[aba].itens.push(obj);
    toast('Item adicionado!', 'verde');
  }
  salvarTudo(); renderCardapio(); fecharModal('modal-item');
}

function abrirPreviewCardapio() {
  const todos = [...MENU_DATA.restaurante.itens.map(i => ({ ...i, aba: 'Restaurante' })), ...MENU_DATA.lanchonete.itens.map(i => ({ ...i, aba: 'Lanchonete' }))];
  const bodyEl = document.getElementById('modal-preview-body');
  if (!bodyEl) return;
  bodyEl.innerHTML = `
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem">
      ${todos.filter(i => i.destaque).length ? '<span class="pill pill-amar">' + todos.filter(i => i.destaque).length + ' em destaque</span>' : ''}
      <span class="pill pill-gray">${todos.filter(i => i.disponivel).length} disponíveis de ${todos.length}</span>
    </div>
    <div class="preview-grid">${todos.map(item => {
      const pub = item.precoPublico ?? 0; const sesc = item.precoSesc ?? pub;
      const desc = pub > 0 ? Math.round((1 - sesc / pub) * 100) : 0;
      return `<div class="preview-card">
        <div style="position:relative"><img src="${item.img}" alt="${item.nome}" style="width:100%;height:110px;object-fit:cover">
        ${item.destaque ? '<div style="position:absolute;top:6px;left:6px"><span class="pill pill-amar">Destaque</span></div>' : ''}
        ${!item.disponivel ? '<div style="position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.75rem;font-weight:700">Indisponível</div>' : ''}
        </div>
        <div class="preview-card-body">
          <div class="preview-card-name">${item.nome}</div>
          <div style="font-size:.7rem;color:var(--text-4);margin-bottom:.35rem">${item.aba} · ${item.categoria}</div>
          <div class="price-dual"><span class="price-sesc">R$ ${sesc.toFixed(2).replace('.', ',')}</span>${desc > 0 ? `<span class="price-public">R$ ${pub.toFixed(2).replace('.', ',')}</span><span class="price-badge">-${desc}%</span>` : ''}</div>
        </div>
      </div>`;
    }).join('')}</div>`;
  abrirModal('modal-preview');
}

// ───────────────────────────────────────────────────────
// 9. ESPAÇOS (admin)
// ───────────────────────────────────────────────────────
function renderEspacos() {
  const tbodyEl = document.getElementById('esp-tbody');
  if (!tbodyEl) return;
  const countEl = document.getElementById('esp-count');
  if (countEl) countEl.textContent = ESPACOS.length + ' espaços';
  tbodyEl.innerHTML = ESPACOS.map(e => `<tr>
    <td><img src="${e.img}" style="width:52px;height:40px;object-fit:cover;border-radius:var(--r1)" alt="${e.nome}"></td>
    <td><span style="font-weight:600">${e.nome}</span></td>
    <td><span class="pill pill-${e.categoria === 'Esporte' ? 'azul' : e.categoria === 'Eventos' ? 'roxo' : 'orange'}">${e.categoria}</span></td>
    <td>${e.capacidade} pessoas</td>
    <td style="font-size:.78rem;color:var(--text-3);max-width:200px">${e.horarios}</td>
    <td><div style="display:flex;gap:.35rem">
      <button class="btn-icon" onclick="abrirModalEspaco('${e.id}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
      <button class="btn-icon" style="background:var(--red-p);color:var(--red);border-color:var(--red)" onclick="confirmar('Excluir este espaço?',()=>excluirEspaco('${e.id}'))"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--text-4);padding:2rem">Nenhum espaço.</td></tr>';
}

function abrirModalEspaco(id) {
  const isNovo = !id;
  const titleEl = document.getElementById('modal-espaco-title');
  if (titleEl) titleEl.textContent = isNovo ? 'Novo Espaço' : 'Editar Espaço';
  const editIdEl = document.getElementById('esp-edit-id');
  if (editIdEl) editIdEl.value = id || '';
  if (isNovo) {
    ['esp-nome', 'esp-cap', 'esp-antec', 'esp-desc', 'esp-regras', 'esp-hor', 'esp-img'].forEach(f => { const el = document.getElementById(f); if (el) el.value = ''; });
    const catEl = document.getElementById('esp-cat'); if (catEl) catEl.value = 'Esporte';
  } else {
    const e = ESPACOS.find(e => e.id === id);
    if (!e) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    set('esp-nome', e.nome); set('esp-cat', e.categoria); set('esp-cap', e.capacidade);
    set('esp-antec', e.antecedencia); set('esp-desc', e.descricao);
    set('esp-regras', e.regras); set('esp-hor', e.horarios); set('esp-img', e.img);
  }
  abrirModal('modal-espaco');
}

function salvarEspaco() {
  const id = document.getElementById('esp-edit-id')?.value;
  const nome = document.getElementById('esp-nome')?.value.trim();
  const cap = parseInt(document.getElementById('esp-cap')?.value);
  if (!nome || isNaN(cap)) { toast('Preencha nome e capacidade', 'red'); return; }
  const obj = {
    id: id || 'e' + Date.now().toString(36),
    nome, categoria: document.getElementById('esp-cat')?.value,
    capacidade: cap,
    antecedencia: document.getElementById('esp-antec')?.value,
    descricao: document.getElementById('esp-desc')?.value,
    regras: document.getElementById('esp-regras')?.value,
    horarios: document.getElementById('esp-hor')?.value,
    img: document.getElementById('esp-img')?.value || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80'
  };
  if (id) { const idx = ESPACOS.findIndex(e => e.id === id); if (idx !== -1) ESPACOS[idx] = obj; toast('Espaço atualizado!', 'verde'); }
  else { ESPACOS.push(obj); toast('Espaço adicionado!', 'verde'); }
  salvarTudo(); renderEspacos(); fecharModal('modal-espaco');
}

function excluirEspaco(id) {
  const idx = ESPACOS.findIndex(e => e.id === id);
  if (idx !== -1) { const nome = ESPACOS[idx].nome; ESPACOS.splice(idx, 1); salvarTudo(); renderEspacos(); toast(`"${nome}" removido`, 'red'); }
}

// ───────────────────────────────────────────────────────
// 10. AGENDAMENTOS (admin)
// ───────────────────────────────────────────────────────
function renderAgendamentos() {
  const filtroEl = document.getElementById('filter-status-agt');
  const filtro = filtroEl ? filtroEl.value : '';
  const lista = filtro ? SOLICITACOES.filter(s => s.status === filtro) : SOLICITACOES;
  const countEl = document.getElementById('agt-count');
  if (countEl) countEl.textContent = lista.length + ' solicitações';
  const tbodyEl = document.getElementById('agt-tbody');
  if (!tbodyEl) return;
  tbodyEl.innerHTML = lista.length ? lista.map((s) => `<tr>
    <td style="font-size:.78rem;font-weight:600">${s.protocolo}</td>
    <td>${s.solicitante}</td>
    <td>${s.espaco}</td>
    <td>${s.data}</td>
    <td>${s.hi}–${s.hf}</td>
    <td><span class="pill ${s.status === 'Aprovado' ? 'pill-verde' : s.status === 'Recusado' ? 'pill-red' : 'pill-amar'}">${s.status}</span></td>
    <td><div style="display:flex;gap:.35rem">
      <button class="btn btn-verde btn-sm" onclick="alterarStatusAgt(${SOLICITACOES.indexOf(s)},'Aprovado')" ${s.status !== 'Pendente' ? 'disabled' : ''}>✓</button>
      <button class="btn btn-red btn-sm" onclick="alterarStatusAgt(${SOLICITACOES.indexOf(s)},'Recusado')" ${s.status !== 'Pendente' ? 'disabled' : ''}>✗</button>
    </div></td>
  </tr>`).join('') : '<tr><td colspan="7" style="text-align:center;color:var(--text-4);padding:2rem">Nenhuma solicitação.</td></tr>';
}

function alterarStatusAgt(idx, status) {
  SOLICITACOES[idx].status = status;
  salvarTudo(); renderAgendamentos();
  toast(`Solicitação ${status.toLowerCase()}`, status === 'Aprovado' ? 'verde' : 'red');
}

function exportarCSV() {
  if (!SOLICITACOES.length) { toast('Nenhuma solicitação para exportar', 'amar'); return; }
  const head = ['Protocolo', 'Solicitante', 'Matrícula', 'Espaço', 'Data', 'Início', 'Término', 'Finalidade', 'Pessoas', 'Status'];
  const rows = SOLICITACOES.map(s => [s.protocolo, s.solicitante, s.matricula, s.espaco, s.data, s.hi, s.hf, s.finalidade, s.pessoas, s.status]);
  const csv = [head, ...rows].map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'agendamentos_sesc_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click(); URL.revokeObjectURL(a.href);
  toast('CSV exportado!', 'verde');
}

// ───────────────────────────────────────────────────────
// 11. USUÁRIOS (admin)
// ───────────────────────────────────────────────────────
function renderUsuarios() {
  const tbodyEl = document.getElementById('usr-tbody');
  if (!tbodyEl) return;
  const usuarios = Object.entries(USUARIOS);
  const countEl = document.getElementById('usr-count');
  if (countEl) countEl.textContent = usuarios.length + ' usuários';
  tbodyEl.innerHTML = usuarios.map(([mat, u]) => `<tr>
    <td style="font-weight:600">${mat}</td>
    <td>${u.nome}</td>
    <td>${u.tipo}</td>
    <td><span class="pill ${u.perfil === 'admin' ? 'pill-roxo' : 'pill-gray'}">${u.perfil}</span></td>
    <td><span class="pill ${u.ativo !== false ? 'pill-verde' : 'pill-red'}">${u.ativo !== false ? 'Ativo' : 'Bloqueado'}</span></td>
    <td><div style="display:flex;gap:.35rem">
      <button class="btn-icon" onclick="abrirModalUsuario('${mat}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
      <button class="btn-icon" style="background:var(--amar-p);color:var(--amar-e);border-color:var(--amar)" onclick="toggleBloqueioUsuario('${mat}')">${u.ativo !== false ? '🔒' : '🔓'}</button>
      ${mat !== APP_ADMIN.usuario?.mat ? `<button class="btn-icon" style="background:var(--red-p);color:var(--red);border-color:var(--red)" onclick="confirmar('Excluir usuário ${u.nome}?',()=>excluirUsuario('${mat}'))"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>` : ''}
    </div></td>
  </tr>`).join('');
}

function abrirModalUsuario(mat) {
  const isNovo = !mat;
  const titleEl = document.getElementById('modal-usr-title');
  if (titleEl) titleEl.textContent = isNovo ? 'Novo Usuário' : 'Editar Usuário';
  const editMatEl = document.getElementById('usr-edit-mat');
  if (editMatEl) editMatEl.value = mat || '';
  if (isNovo) {
    ['usr-mat', 'usr-senha', 'usr-nome'].forEach(f => { const el = document.getElementById(f); if (el) el.value = ''; });
    const tipoEl = document.getElementById('usr-tipo'); if (tipoEl) tipoEl.value = 'Titular';
    const perfEl = document.getElementById('usr-perfil'); if (perfEl) perfEl.value = 'user';
    const matEl = document.getElementById('usr-mat'); if (matEl) matEl.readOnly = false;
  } else {
    const u = USUARIOS[mat];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    set('usr-mat', mat); const matEl = document.getElementById('usr-mat'); if (matEl) matEl.readOnly = true;
    set('usr-senha', u.senha); set('usr-nome', u.nome);
    set('usr-tipo', u.tipo); set('usr-perfil', u.perfil);
  }
  abrirModal('modal-usuario');
}

function salvarUsuario() {
  const oldMat = document.getElementById('usr-edit-mat')?.value;
  const mat = document.getElementById('usr-mat')?.value.trim();
  const nome = document.getElementById('usr-nome')?.value.trim();
  const senha = document.getElementById('usr-senha')?.value.trim();
  if (!mat || mat.length !== 6 || !nome || !senha) { toast('Preencha todos os campos', 'red'); return; }
  if (!oldMat && USUARIOS[mat]) { toast('Matrícula já cadastrada', 'red'); return; }
  if (oldMat && oldMat !== mat) delete USUARIOS[oldMat];
  USUARIOS[mat] = { senha, nome, tipo: document.getElementById('usr-tipo')?.value, perfil: document.getElementById('usr-perfil')?.value, ativo: USUARIOS[mat]?.ativo ?? true };
  salvarTudo(); renderUsuarios(); fecharModal('modal-usuario');
  toast(oldMat ? 'Usuário atualizado!' : 'Usuário criado!', 'verde');
}

function toggleBloqueioUsuario(mat) {
  USUARIOS[mat].ativo = USUARIOS[mat].ativo === false;
  salvarTudo(); renderUsuarios();
  toast(USUARIOS[mat].ativo ? 'Usuário desbloqueado' : 'Usuário bloqueado', 'amar');
}

function excluirUsuario(mat) {
  if (mat === APP_ADMIN.usuario?.mat) { toast('Não pode excluir sua própria conta', 'red'); return; }
  delete USUARIOS[mat]; salvarTudo(); renderUsuarios(); toast('Usuário removido', 'red');
}

// ───────────────────────────────────────────────────────
// 12. MODO TV (admin)
// ───────────────────────────────────────────────────────
function getTVItens() {
  const filtroEl = document.querySelector('input[name="tv-aba"]:checked');
  const filtro = filtroEl ? filtroEl.value : 'todos';
  const rest  = MENU_DATA.restaurante.itens.filter(i => i.disponivel).map(i => ({ ...i, aba: 'Restaurante' }));
  const lanch = MENU_DATA.lanchonete.itens.filter(i => i.disponivel).map(i => ({ ...i, aba: 'Lanchonete' }));
  if (filtro === 'restaurante') return rest;
  if (filtro === 'lanchonete') return lanch;
  return [...rest, ...lanch];
}

function renderTVPreview() {
  tvItens = getTVItens();
  if (!tvItens.length) return;
  tvAtual = 0;
  const container = document.getElementById('tv-slides-container');
  if (!container) return;
  container.innerHTML = tvItens.map((item, i) => {
    const pub = item.precoPublico ?? 0; const sesc = item.precoSesc ?? pub;
    const desc = pub > 0 ? Math.round((1 - sesc / pub) * 100) : 0;
    return `<div class="tv-slide${i === 0 ? ' active' : ''}" id="tvs-${i}" style="position:${i === 0 ? 'relative' : 'absolute'};inset:0;background:linear-gradient(135deg,#0a1628,#0f2040)">
      <img src="${item.img}" alt="${item.nome}" style="max-height:42%;border-radius:12px;margin-bottom:.75rem;object-fit:cover;width:80%;max-width:300px" onerror="this.style.display='none'">
      <div class="tv-slide-cat">${item.aba} · ${item.categoria}</div>
      <div class="tv-slide-nome">${item.nome}</div>
      <div class="tv-slide-preco">
        ${desc > 0 ? `<span class="tv-preco-pub">R$ ${pub.toFixed(2).replace('.', ',')}</span>` : ''}
        <span class="tv-preco-sesc">R$ ${sesc.toFixed(2).replace('.', ',')}</span>
        ${desc > 0 ? `<span class="tv-preco-badge">-${desc}% Sesc</span>` : ''}
      </div>
    </div>`;
  }).join('');
  const dotsEl = document.getElementById('tv-dots-bar');
  if (dotsEl) dotsEl.innerHTML = tvItens.map((_, i) => `<div class="tv-dot${i === 0 ? ' active' : ''}" id="tvdot-${i}"></div>`).join('');
  if (tvTimer) clearInterval(tvTimer);
  iniciarTV();
}

function iniciarTV() {
  if (tvTimer) clearInterval(tvTimer);
  tvPausado = false;
  const speedEl = document.getElementById('tv-speed');
  const speed = parseInt(speedEl ? speedEl.value : '5000');
  const prog = document.getElementById('tv-progress');
  if (prog) { prog.style.transition = `width ${speed}ms linear`; prog.style.width = '100%'; }
  tvTimer = setInterval(() => { if (!tvPausado) avancarTV(); }, speed);
}

function avancarTV() {
  tvItens = getTVItens();
  if (!tvItens.length) return;
  const prev = tvAtual;
  tvAtual = (tvAtual + 1) % tvItens.length;
  const transEl = document.getElementById('tv-transition');
  const transition = transEl ? transEl.value : 'fade';
  const prevSlide = document.getElementById('tvs-' + prev);
  const nextSlide = document.getElementById('tvs-' + tvAtual);
  if (!prevSlide || !nextSlide) return;
  if (transition === 'fade') {
    prevSlide.style.cssText = 'position:absolute;inset:0;opacity:1;transition:opacity .6s ease;background:linear-gradient(135deg,#0a1628,#0f2040)';
    nextSlide.style.cssText = 'position:absolute;inset:0;opacity:0;transition:opacity .6s ease;background:linear-gradient(135deg,#0a1628,#0f2040)';
    nextSlide.classList.add('active');
    requestAnimationFrame(() => { prevSlide.style.opacity = '0'; nextSlide.style.opacity = '1'; });
    setTimeout(() => { prevSlide.classList.remove('active'); prevSlide.style.cssText = 'position:absolute;inset:0;background:linear-gradient(135deg,#0a1628,#0f2040)'; }, 650);
  } else {
    prevSlide.style.cssText = 'position:absolute;inset:0;transform:translateX(0);transition:transform .5s ease;background:linear-gradient(135deg,#0a1628,#0f2040)';
    nextSlide.style.cssText = 'position:absolute;inset:0;transform:translateX(100%);transition:transform .5s ease;background:linear-gradient(135deg,#0a1628,#0f2040)';
    nextSlide.classList.add('active');
    requestAnimationFrame(() => { prevSlide.style.transform = 'translateX(-100%)'; nextSlide.style.transform = 'translateX(0)'; });
    setTimeout(() => { prevSlide.classList.remove('active'); prevSlide.style.cssText = 'position:absolute;inset:0;background:linear-gradient(135deg,#0a1628,#0f2040)'; }, 550);
  }
  document.querySelectorAll('.tv-dot').forEach((d, i) => d.classList.toggle('active', i === tvAtual));
  const prog = document.getElementById('tv-progress');
  if (prog) {
    const speedEl = document.getElementById('tv-speed');
    const speed = parseInt(speedEl ? speedEl.value : '5000');
    prog.style.transition = 'none'; prog.style.width = '0%';
    requestAnimationFrame(() => { prog.style.transition = `width ${speed}ms linear`; prog.style.width = '100%'; });
  }
}

function togglePauseTV() {
  tvPausado = !tvPausado;
  const frame = document.getElementById('tv-preview-frame');
  if (frame) frame.style.outline = tvPausado ? '2px solid var(--amar)' : 'none';
}

function abrirModoTV() {
  tvItens = getTVItens();
  if (!tvItens.length) { toast('Nenhum item disponível', 'amar'); return; }
  const speedEl = document.getElementById('tv-speed');
  const transEl = document.getElementById('tv-transition');
  const speed = parseInt(speedEl ? speedEl.value : '5000');
  const transition = transEl ? transEl.value : 'fade';
  const slidesHTML = tvItens.map((item, i) => {
    const pub = item.precoPublico ?? 0; const sesc = item.precoSesc ?? pub;
    const desc = pub > 0 ? Math.round((1 - sesc / pub) * 100) : 0;
    return `<div class="tv-slide-full" id="fs-${i}" style="position:absolute;inset:0;display:${i === 0 ? 'flex' : 'none'};flex-direction:column;align-items:center;justify-content:center;padding:4rem;text-align:center;background:linear-gradient(135deg,#060d1a,#0a1830)">
      <div style="font-size:.8rem;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.2em;margin-bottom:.5rem">${item.aba} · ${item.categoria}</div>
      <img src="${item.img}" alt="${item.nome}" style="max-height:50vh;object-fit:contain;border-radius:20px;margin-bottom:2rem;box-shadow:0 20px 60px rgba(0,0,0,.5)" onerror="this.style.display='none'">
      <div style="font-family:'Fraunces',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:#fff;margin-bottom:1rem">${item.nome}</div>
      <div style="display:flex;align-items:baseline;gap:2rem;flex-wrap:wrap;justify-content:center">
        ${desc > 0 ? `<span style="font-size:clamp(1.5rem,3vw,2.5rem);text-decoration:line-through;color:rgba(255,255,255,.35)">R$ ${pub.toFixed(2).replace('.', ',')}</span>` : ''}
        <span style="font-family:'Fraunces',serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;color:#4ade80">R$ ${sesc.toFixed(2).replace('.', ',')}</span>
        ${desc > 0 ? `<span style="font-size:1rem;background:rgba(74,222,128,.15);color:#4ade80;padding:.3rem 1rem;border-radius:100px;font-weight:700">-${desc}% Sesc</span>` : ''}
      </div>
    </div>`;
  }).join('');
  const w = window.open('', 'sesc-tv', 'width=1280,height=720');
  w.document.write(`<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><title>Modo TV — Sesc Bosque</title>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Outfit:wght@400;700;800&display=swap" rel="stylesheet">
    <style>*{margin:0;padding:0;box-sizing:border-box}body{background:#060d1a;overflow:hidden;font-family:'Outfit',sans-serif}
    #tv-container{position:fixed;inset:0}.tv-slide-full{transition:opacity .6s ease}
    #tv-bar{position:fixed;top:0;left:0;right:0;height:4px;background:#4ade80;transform-origin:left;transition:transform ${speed}ms linear}
    #tv-info{position:fixed;bottom:20px;right:24px;display:flex;align-items:center;gap:1rem}
    #tv-dots-fs{display:flex;gap:.4rem}.dot-fs{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.25)}.dot-fs.active{background:#4ade80}
    #tv-logo{font-family:'Fraunces',serif;font-size:.9rem;font-weight:900;color:rgba(255,255,255,.4)}
    #tv-pause-hint{font-size:.7rem;color:rgba(255,255,255,.25)}</style></head><body>
    <div id="tv-container">${slidesHTML}</div>
    <div id="tv-bar"></div>
    <div id="tv-info"><span id="tv-logo">Sesc Bosque</span><div id="tv-dots-fs">${tvItens.map((_, i) => `<div class="dot-fs${i === 0 ? ' active' : ''}" id="dfs-${i}"></div>`).join('')}</div><span id="tv-pause-hint">Espaço para pausar · F = tela cheia</span></div>
    <script>
      let atual=0,paused=false;const slides=document.querySelectorAll('.tv-slide-full');const speed=${speed};
      function showSlide(n){slides.forEach((s,i)=>{s.style.display=i===n?'flex':'none'});document.querySelectorAll('.dot-fs').forEach((d,i)=>d.classList.toggle('active',i===n));const bar=document.getElementById('tv-bar');bar.style.transform='scaleX(0)';bar.style.transition='none';requestAnimationFrame(()=>{bar.style.transition='transform '+speed+'ms linear';bar.style.transform='scaleX(1)';});}
      function next(){atual=(atual+1)%slides.length;showSlide(atual);}
      document.addEventListener('keydown',e=>{if(e.code==='Space'){paused=!paused;e.preventDefault();}if(e.key==='f'||e.key==='F'){if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen();}if(e.key==='ArrowRight'){next();}});
      showSlide(0);setInterval(()=>{if(!paused)next();},speed);
    <\/script></body></html>`);
  w.document.close();
}

// ───────────────────────────────────────────────────────
// 13. MODAIS & TOASTS (universal)
// ───────────────────────────────────────────────────────
function abrirModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function fecharModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

// Fechar modal ao clicar fora
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) fecharModal(o.id); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => {
    m.classList.remove('open'); document.body.style.overflow = '';
  });
});

function confirmar(msg, cb) {
  const msgEl = document.getElementById('confirm-msg');
  if (msgEl) msgEl.textContent = msg;
  const btn = document.getElementById('confirm-btn');
  if (btn) { btn.onclick = () => { fecharModal('modal-confirm'); cb(); }; }
  abrirModal('modal-confirm');
}

function toast(msg, tipo) {
  tipo = tipo || 'azul';
  const icons = {
    verde: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    red:   '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    azul:  '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    amar:  '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
  };
  const container = document.getElementById('toasts');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${tipo}`;
  el.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0">${icons[tipo] || icons.azul}</svg><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => { el.classList.add('fadeout'); setTimeout(() => el.remove(), 300); }, 4000);
}

// ───────────────────────────────────────────────────────
// 14. TEMA
// ───────────────────────────────────────────────────────
function toggleTema() {
  const html = document.documentElement;
  const novo = html.dataset.tema === 'claro' ? 'escuro' : 'claro';
  html.dataset.tema = novo;
  try { localStorage.setItem('sesc_tema', novo); } catch(e) {}
  const svg = document.getElementById('icon-tema');
  if (svg) {
    svg.innerHTML = novo === 'escuro'
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
}

// ───────────────────────────────────────────────────────
// 15. LISTENERS ADMIN (null-guarded — só rodam se o elemento existir)
// ───────────────────────────────────────────────────────
(function initAdminListeners() {
  const itemAbaEl = document.getElementById('item-aba');
  if (itemAbaEl) {
    itemAbaEl.addEventListener('change', function() { atualizarCatsSelect(this.value); });
  }
  const itemPrecoSescEl = document.getElementById('item-preco-sesc');
  if (itemPrecoSescEl) {
    itemPrecoSescEl.addEventListener('input', function() {
      const pub  = parseFloat(document.getElementById('item-preco-pub')?.value) || 0;
      const sesc = parseFloat(this.value) || 0;
      const desc = pub > 0 && sesc > 0 ? Math.round((1 - sesc / pub) * 100) : 0;
      const prevEl = document.getElementById('item-desconto-preview');
      if (prevEl) prevEl.textContent = desc > 0 ? `Desconto de ${desc}% para carteirinha Sesc` : '';
    });
  }
})();

// ───────────────────────────────────────────────────────
// 16. INIT — aplica tema salvo e carrega dados
// ───────────────────────────────────────────────────────
(function init() {
  try {
    const tema = localStorage.getItem('sesc_tema');
    if (tema) document.documentElement.dataset.tema = tema;
  } catch(e) {}
  carregarTudo();
})();

// ====================== SUPABASE CONFIG ======================
const SUPABASE_URL = 'https://xaotmnynsvbjugdlalmb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NcUtLU0LxvA3IB1UNnvyoA__nkFB6Cu';

let supabaseClient;   // Este é o cliente que vamos usar

function initSupabase() {
    try {
        // 'supabase' vem da biblioteca CDN que carregamos
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        console.log('Supabase conectado com sucesso!');
        
    } catch (error) {
        console.error('Erro ao conectar com Supabase:', error);
    }
}

// Inicializa
initSupabase();
// ============================================================