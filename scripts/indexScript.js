import { supabase } from "./supabaseConfig.js";

const { data: { session } } = await supabase.auth.getSession()

if (session) {
  console.log("Usuário logado:", session.user)
} else {
  console.log("Nenhum usuário ativo")
}


document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon'); // Seleciona a imagem do ícone pelo ID
    const body = document.body;

    const sunIconUrl = "https://img.icons8.com/ios-filled/50/sun--v1.png";
    const moonIconUrl = "https://img.icons8.com/ios-filled/50/crescent-moon.png";

    // Função para aplicar o tema salvo
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) { // Garante que o ícone existe antes de tentar mudar
                themeIcon.src = sunIconUrl;
                themeIcon.alt = 'Modo Claro';
            }
        } else {
            body.classList.remove('dark-mode');
            if (themeIcon) { // Garante que o ícone existe antes de tentar mudar
                themeIcon.src = moonIconUrl;
                themeIcon.alt = 'Modo Escuro';
            }
        }
    }

    // Aplica o tema salvo assim que a página carrega
    applySavedTheme();

    // Listener de clique para alternar o tema
    if (themeToggleBtn) { // Garante que o botão de toggle existe
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.src = sunIconUrl;
                    themeIcon.alt = 'Modo Claro';
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.src = moonIconUrl;
                    themeIcon.alt = 'Modo Escuro';
                }
            }
        });
    }

    // Opcional: Implementar a lógica do search-btn e cart-btn aqui, se você tiver
    // (Mantenha seu código existente para esses botões)
});