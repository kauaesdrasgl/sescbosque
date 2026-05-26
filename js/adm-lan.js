'use strict';

/* =============================================
   CONFIGURAÇÃO SUPABASE
============================================= */
const SB_URL = 'https://xaotmnynsvbjugdlalmb.supabase.co';
const SB_KEY = 'sb_publishable_NcUtLU0LxvA3IB1UNnvyoA__nkFB6Cu';
const TABELA = 'lanchonete_itens';
const BUCKET = 'produtos';

/* Credenciais */
const CRED = { mat: '999999', senha: 'admin123' };
const SESS_KEY = 'sesc_admin_lanch_logado';

/* Estado Global */
let sb = null;
let todosItens = [];
let fotoArquivo = null;
let itemExcluirId = null;

/* =============================================
   INICIALIZAÇÃO
============================================= */
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem(SESS_KEY) === 'ok') {
        mostrarPainel();
    }
    document.getElementById('adm-mat').focus();
});

async function inicializarSupabase() {
    try {
        sb = window.supabase.createClient(SB_URL, SB_KEY);
        const { error } = await sb.from(TABELA).select('id').limit(1);
        if (error) throw error;

        setBanner('ok', '✅ Supabase conectado');
        console.log("✅ Supabase inicializado com sucesso");
        return true;
    } catch (e) {
        console.error("❌ Erro Supabase:", e);
        sb = null;
        setBanner('erro', '❌ Supabase offline — Modo Local');
        return false;
    }
}

function setBanner(tipo, msg) {
    const banner = document.getElementById('conexao-banner');
    if (banner) {
        banner.className = `conexao-banner ${tipo === 'ok' ? 'conexao-ok' : 'conexao-erro'}`;
        banner.querySelector('span').textContent = msg;
    }
}

/* =============================================
   LOGIN
============================================= */
function fazerLogin() {
    const mat = document.getElementById('adm-mat').value.trim();
    const senha = document.getElementById('adm-senha').value;

    document.getElementById('err-mat').style.display = 'none';
    document.getElementById('err-senha').style.display = 'none';

    if (mat !== CRED.mat) {
        document.getElementById('err-mat').style.display = 'flex';
        return;
    }
    if (senha !== CRED.senha) {
        document.getElementById('err-senha').style.display = 'flex';
        return;
    }

    sessionStorage.setItem(SESS_KEY, 'ok');
    mostrarPainel();
}

function sair() {
    sessionStorage.removeItem(SESS_KEY);
    location.reload();
}

async function mostrarPainel() {
    document.getElementById('tela-login').style.display = 'none';
    document.getElementById('tela-painel').style.display = 'block';
    await inicializarSupabase();
    carregarItens();
}

/* =============================================
   CRUD
============================================= */
async function carregarItens() {
    const tbody = document.getElementById('tbody-itens');
    tbody.innerHTML = `<tr><td colspan="8">Carregando...</td></tr>`;

    let data = [];
    if (sb) {
        const { data: d, error } = await sb.from(TABELA).select('*').order('created_at', { ascending: false });
        if (error) console.error("Erro ao carregar:", error);
        else data = d || [];
    }

    todosItens = data.map(item => ({
        id: item.id,
        nome: item.nome || '',
        categoria: item.categoria || '',
        descricao: item.descricao || '',
        precoPublico: parseFloat(item.preco_publico || 0),
        precoSesc: parseFloat(item.preco_sesc || 0),
        disponivel: item.disponivel !== false,
        img: item.img || ''
    }));

    atualizarMetricas();
    filtrarTabela();
}

function atualizarMetricas() {
    const total = todosItens.length;
    const ativos = todosItens.filter(i => i.disponivel).length;
    document.getElementById('met-total').textContent = total;
    document.getElementById('met-ativos').textContent = ativos;
    document.getElementById('met-inativos').textContent = total - ativos;
}

function filtrarTabela() {
    const busca = (document.getElementById('busca-input')?.value || '').toLowerCase();
    const lista = todosItens.filter(item => !busca || item.nome.toLowerCase().includes(busca));
    renderTabela(lista);
}

function renderTabela(lista) {
    const tbody = document.getElementById('tbody-itens');
    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:#64748B">Nenhum item encontrado</td></tr>`;
        return;
    }

    tbody.innerHTML = lista.map(item => `
        <tr>
            <td>${item.img ? `<img src="${item.img}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;">` : '☕'}</td>
            <td><strong>${item.nome}</strong></td>
            <td>${item.categoria}</td>
            <td>R$ ${(item.precoPublico || 0).toFixed(2)}</td>
            <td><strong>R$ ${(item.precoSesc || 0).toFixed(2)}</strong></td>
            <td>
                <label class="toggle-sw">
                    <input type="checkbox" ${item.disponivel ? 'checked' : ''} onchange="toggleDisponivel('${item.id}', this.checked)">
                    <span class="toggle-slider"></span>
                </label>
            </td>
            <td>
                <button class="btn btn-sm" onclick="abrirModalItem(todosItens.find(i => String(i.id) === '${item.id}'))">Editar</button>
                <button class="btn btn-red btn-sm" onclick="abrirConfirm('${item.id}', '${item.nome.replace(/'/g,"\\'")}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

/* =============================================
   MODAL + UPLOAD
============================================= */
function abrirModalItem(item = null) {
    document.getElementById('edit-id').value = item ? item.id : '';
    document.getElementById('f-nome').value = item ? item.nome : '';
    document.getElementById('f-cat').value = item ? item.categoria : '';
    document.getElementById('f-desc').value = item ? item.descricao : '';
    document.getElementById('f-preco-pub').value = item ? item.precoPublico : '';
    document.getElementById('f-preco-sesc').value = item ? item.precoSesc : '';
    document.getElementById('f-disponivel').checked = item ? item.disponivel : true;

    document.getElementById('modal-item-titulo').textContent = item ? 'Editar Item' : 'Novo Item';
    document.getElementById('modal-item').classList.add('open');
    
    fotoArquivo = null;
    document.getElementById('f-foto-file').value = '';
    document.getElementById('upload-preview').style.display = 'none';
}

function fecharModalItem() {
    document.getElementById('modal-item').classList.remove('open');
}

async function salvarItem() {
    const nome = document.getElementById('f-nome').value.trim();
    if (!nome) return toast('Nome é obrigatório', 'amar');

    let imgUrl = '';

    // === UPLOAD DA IMAGEM ===
    if (fotoArquivo && sb) {
        const cleanName = fotoArquivo.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const fileName = `lanch_${Date.now()}_${cleanName}`;

        const { error: uploadError } = await sb.storage
            .from(BUCKET)
            .upload(fileName, fotoArquivo, { upsert: true, contentType: fotoArquivo.type });

        if (!uploadError) {
            const { data } = sb.storage.from(BUCKET).getPublicUrl(fileName);
            imgUrl = data.publicUrl;
            toast('✅ Imagem enviada!', 'verde');
        } else {
            console.error("Upload Error:", uploadError);
            toast('❌ Falha no upload da imagem', 'red');
        }
    }

    // === SALVAR ITEM ===
    const payload = {
        nome,
        categoria: document.getElementById('f-cat').value,
        descricao: document.getElementById('f-desc').value.trim(),
        preco_publico: parseFloat(document.getElementById('f-preco-pub').value) || 0,
        preco_sesc: parseFloat(document.getElementById('f-preco-sesc').value) || 0,
        img: imgUrl,
        disponivel: document.getElementById('f-disponivel').checked,
        created_at: new Date().toISOString()
    };

    const editId = document.getElementById('edit-id').value;
    let result;

    if (editId && sb) {
        result = await sb.from(TABELA).update(payload).eq('id', editId);
    } else if (sb) {
        result = await sb.from(TABELA).insert([payload]);
    }

    if (result && result.error) {
        console.error("Erro ao salvar item:", result.error);
        toast('Erro ao salvar: ' + result.error.message, 'red');
    } else {
        toast('✅ Item salvo com sucesso!', 'verde');
        fecharModalItem();
        carregarItens();
    }
}

/* Upload Preview */
function onFileChange(e) {
    fotoArquivo = e.target.files[0];
    if (!fotoArquivo) return;

    const reader = new FileReader();
    reader.onload = ev => {
        document.getElementById('upload-preview').style.display = 'block';
        document.getElementById('upload-preview-img').src = ev.target.result;
    };
    reader.readAsDataURL(fotoArquivo);
}

/* Toggle */
async function toggleDisponivel(id, valor) {
    if (sb) await sb.from(TABELA).update({ disponivel: valor }).eq('id', id);
    toast(valor ? '✅ Ativado' : '⛔ Desativado', 'verde');
}

function toast(msg, tipo = 'azul') {
    const container = document.getElementById('toasts');
    const el = document.createElement('div');
    el.className = `toast toast-${tipo}`;
    el.innerHTML = `<span>${tipo === 'verde' ? '✅' : 'ℹ️'}</span><span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

/* Auxiliares */
function calcDesconto() {}
function mudarTab(tab, btn) {
    document.querySelectorAll('.painel').forEach(p => p.classList.remove('ativo'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('ativo'));
    document.getElementById('painel-' + tab).classList.add('ativo');
    if (btn) btn.classList.add('ativo');
}