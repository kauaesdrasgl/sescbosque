let dadosLanchonete = [];
let categoriasDisponiveis = [];
let filtroAtivo = "todos";

async function carregarLanchonete() {
    document.getElementById("menu-content").innerHTML = `<div class="empty-state"><p>Carregando cardápio da lanchonete...</p></div>`;

    window.initSupabase();
    await new Promise(r => setTimeout(r, 500));

    const dados = await window.fetchFromSupabase('lanchonete_itens');

    if (dados && dados.length > 0) {
        dadosLanchonete = dados.map(item => ({
            nome: item.nome,
            categoria: item.categoria,
            descricao: item.descricao,
            precoPublico: parseFloat(item.preco_publico) || 0,
            precoSesc: parseFloat(item.preco_sesc) || 0,
            disponivel: item.disponivel !== false,
            destaque: item.destaque === true,
            tags: Array.isArray(item.tags) ? item.tags : [],
            img: item.img
        }));

        categoriasDisponiveis = [...new Set(dadosLanchonete.map(i => i.categoria).filter(Boolean))];
        console.log(`✅ ${dadosLanchonete.length} itens carregados do Supabase`);
    } else {
        console.warn("⚠️ Usando fallback local");
        const localData = typeof AppData !== 'undefined' ? AppData.carregar() : { menu: { lanchonete: { itens: [] } } };
        dadosLanchonete = localData.menu?.lanchonete?.itens || [];
        categoriasDisponiveis = ["Lanches", "Salgados", "Sucos & Vitaminas", "Café & Bebidas", "Doces & Bolos"];
    }

    renderFiltros();
    renderCardapio();
    if (typeof toast === "function") toast("Cardápio carregado!", "verde");
}

function renderFiltros() {
    const container = document.getElementById("filtros-container");
    if (!container) return;
    let html = `<button class="filtro-btn ${filtroAtivo === "todos" ? "ativo" : ""}" onclick="filtrar('todos', this)">Todos</button>`;
    categoriasDisponiveis.forEach(c => {
        html += `<button class="filtro-btn ${filtroAtivo === c ? "ativo" : ""}" onclick="filtrar('${c}', this)">${c}</button>`;
    });
    container.innerHTML = html;
}

function filtrar(cat, btn) {
    filtroAtivo = cat;
    document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("ativo"));
    if (btn) btn.classList.add("ativo");
    renderCardapio();
}

function renderCardapio() {
    const container = document.getElementById("menu-content");
    if (!container) return;

    const itensVisiveis = dadosLanchonete.filter(i => i.disponivel !== false);
    if (itensVisiveis.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>Nenhum item disponível.</p></div>`;
        return;
    }

    let html = "";
    const catsExibir = filtroAtivo === "todos" ? categoriasDisponiveis : [filtroAtivo];

    catsExibir.forEach(cat => {
        const itens = itensVisiveis.filter(i => i.categoria === cat);
        if (!itens.length) return;
        html += `<h2 class="section-title">${cat} <span class="section-count">${itens.length} itens</span></h2>`;
        html += `<div class="menu-grid">${itens.map(renderItem).join("")}</div>`;
    });

    container.innerHTML = html;
}

function renderItem(item) {
    const pub = item.precoPublico || 0;
    const sesc = item.precoSesc || pub;
    const desconto = pub > 0 && sesc < pub ? Math.round((1 - sesc / pub) * 100) : 0;
    const tags = item.tags || [];

    return `<div class="item-card">
    <div style="position:relative">
      <img class="item-img" src="${item.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}" alt="${item.nome}">
      ${item.destaque ? '<div class="item-badges"><span class="badge badge-destaque">⭐ Destaque</span></div>' : ''}
    </div>
    <div class="item-body">
      <div class="item-name">${item.nome}</div>
      <div class="item-desc">${item.descricao || ''}</div>
      ${tags.length ? `<div class="item-tags">${tags.map(t => `<span class="item-tag">${t}</span>`).join('')}</div>` : ''}
      <div class="item-price">
        <div>
          <div class="price-label">Associado Sesc</div>
          <div class="price-sesc">R$ ${sesc.toFixed(2).replace(".", ",")}</div>
        </div>
        ${desconto > 0 ? `<span class="price-pub">R$ ${pub.toFixed(2).replace(".", ",")}</span><span class="price-badge">-${desconto}%</span>` : ''}
      </div>
    </div>
  </div>`;
}

function toast(msg, tipo = "azul") {
    const container = document.getElementById("toasts");
    if (!container) return;
    const el = document.createElement("div");
    el.className = `toast toast-${tipo}`;
    el.innerHTML = `<span>${tipo === "verde" ? "✅" : "☕"}</span><span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

window.onload = carregarLanchonete;