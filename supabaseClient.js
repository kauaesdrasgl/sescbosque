// supabaseClient.js - Versão Final para Admin + Upload
const SUPABASE_URL = 'https://xaotmnynsvbjugdlalmb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NcUtLU0LxvA3IB1UNnvyoA__nkFB6Cu';

let supabaseClient = null;

function initSupabase() {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase Client inicializado com sucesso!");
    return true;
  } catch (e) {
    console.error("❌ Erro Supabase:", e);
    return false;
  }
}

async function fetchFromSupabase(table) {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient.from(table).select('*');
    if (error) throw error;
    return data;
  } catch (e) {
    console.error(`Erro ao buscar ${table}:`, e);
    return null;
  }
}

async function saveItemToSupabase(table, item) {
  if (!supabaseClient) return false;
  try {
    const { error } = await supabaseClient.from(table).insert([item]);
    if (error) throw error;
    console.log(`✅ Item salvo em ${table}`);
    return true;
  } catch (e) {
    console.error("Erro ao salvar:", e);
    return false;
  }
}

window.initSupabase = initSupabase;
window.fetchFromSupabase = fetchFromSupabase;
window.saveItemToSupabase = saveItemToSupabase;