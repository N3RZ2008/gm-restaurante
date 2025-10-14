import { supabase } from "./supabaseConfig.js"

const form = document.querySelector("#signUpForm")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = form.querySelector("#email").value
    const password = form.querySelector("#password").value

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) {
        alert("Erro: " + error.message)
    } else {
        alert("Cadastro bem-sucedido!")
        console.log("Sessão:", data.session)
    }
})