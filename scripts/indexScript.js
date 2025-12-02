import { findAll, findOne } from "./database/useApi.js"
import { supabase } from "./supabaseConfig.js"

const loginLink = document.getElementById("loginLink")
const signUpLink = document.getElementById("signUpLink")
const logOutLink = document.getElementById("logOutLink")
const managerLink = document.getElementById("managerLink")
const workerLink = document.getElementById("workerLink")
const cartLink = document.getElementById("cartLink")
const userOrdersLink = document.getElementById("userOrdersLink")

const { data: { session } } = await supabase.auth.getSession()

if (session) {
    logOutLink.style.display = "initial"
    console.log("Usuário logado:", session.user)

    if (logOutLink) {
        logOutLink.addEventListener("click", async function (event) {
            event.preventDefault()

            const confirmacao = confirm("Você tem certeza que deseja sair da sua conta?")

            if (confirmacao) {
                const { error } = await supabase.auth.signOut()

                if (error) {
                    console.error("Erro ao sair:", error.message)
                    alert("Ocorreu um erro ao tentar sair.")
                } else {
                    console.log("Logout bem-sucedido.")
                    window.location.href = "index.html"
                }
            }
        })
    }

    cartLink.addEventListener("click", function () {
        window.location.href = "pages/cart.html"
    })

    userOrdersLink.addEventListener("click", function () {
        window.location.href = "pages/userOrders.html"
    })

    const databaseInfo = await findOne("users", session.user.id)
    if (databaseInfo.role === "manager") {
        managerLink.style.display = "initial"
    }
    if (databaseInfo.role !== "user") {
        workerLink.style.display = "initial"
    }
} else {
    loginLink.style.display = "initial"
    signUpLink.style.display = "initial"
    console.log("Nenhum usuário ativo")
}

const themeToggleBtn = document.getElementById('theme-toggle-btn')
const themeIcon = document.getElementById('theme-icon')
const body = document.body

const sunIconUrl = "https://img.icons8.com/ios-filled/50/sun--v1.png"
const moonIconUrl = "https://img.icons8.com/ios-filled/50/crescent-moon.png"

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode')
        if (themeIcon) {
            themeIcon.src = sunIconUrl
            themeIcon.alt = 'Modo Claro'
        }
    } else {
        body.classList.remove('dark-mode')
        if (themeIcon) {
            themeIcon.src = moonIconUrl
            themeIcon.alt = 'Modo Escuro'
        }
    }
}

applySavedTheme()

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode')

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark')
            if (themeIcon) {
                themeIcon.src = sunIconUrl
                themeIcon.alt = 'Modo Claro'
            }
        } else {
            localStorage.setItem('theme', 'light')
            if (themeIcon) {
                themeIcon.src = moonIconUrl
                themeIcon.alt = 'Modo Escuro'
            }
        }
    })
}

const imgSrcs = [
    "./img/espaguete.webp",
    "./img/lasanha.jpg",
    "./img/risoto.jpg",
    "./img/torta_limao.jfif",
    "./img/torta_salgada.jpg",
    "./img/composicao-kit-feijoada-525x350.jpg"
]
const ordersContainer = document.getElementById("ordersContainer")

async function loadOrderConfig() {
    const orderConfig = await findAll("orderConfig")
    console.log(orderConfig)

    for (let i = 0; i < orderConfig.length; i++) {
        const box = document.createElement("div")
        box.className = "box"

        const img = document.createElement("img")
        img.src = imgSrcs[orderConfig[i].imageId]
        box.append(img)

        const title = document.createElement("h3")
        title.textContent = orderConfig[i].name
        box.append(title)

        const price = document.createElement("div")
        price.className = "preco"
        price.textContent = "R$" + orderConfig[i].price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        box.append(price)

        const button = document.createElement("button")
        button.className = "btn"
        button.textContent = "Adicionar ao Carrinho"
        button.addEventListener("click", () => { addToCart(orderConfig[i].number) })
        box.append(button)

        ordersContainer.append(box)
    }
}
loadOrderConfig()

let orderChoices = []

function addToCart(id) {
    orderChoices.push(id)
    sessionStorage.setItem("orderChoices", JSON.stringify(orderChoices))
    alert("Pedido adicionado com sucesso!")
    console.log(JSON.parse(sessionStorage.getItem("orderChoices")))
}

// const button1 = document.getElementById("button1")
// button1.addEventListener("click", () => { addToCart(0) })
// const button2 = document.getElementById("button2")
// button2.addEventListener("click", () => { addToCart(1) })
// const button3 = document.getElementById("button3")
// button3.addEventListener("click", () => { addToCart(2) })
// const button4 = document.getElementById("button4")
// button4.addEventListener("click", () => { addToCart(3) })
// const button5 = document.getElementById("button5")
// button5.addEventListener("click", () => { addToCart(4) })
// const button6 = document.getElementById("button6")
// button6.addEventListener("click", () => { addToCart(5) })