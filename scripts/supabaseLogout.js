import { supabase } from "./supabaseConfig.js";
const { data: { session } } = await supabase.auth.getSession()

if (!session) {
    alert("Não há conta conectada")
} else {
    if(confirm("Tem certeza que deseja sair?")) {
        supabase.auth.signOut()
    }
}