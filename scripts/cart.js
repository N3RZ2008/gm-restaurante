import { findAll, insertOne } from "./database/useApi.js"
import { supabase } from "./supabaseConfig.js"

const { data: { session } } = await supabase.auth.getSession()
const orders = JSON.parse(sessionStorage.getItem("orderChoices"))

const orderList = document.getElementById("orderList")
const finishOrderButton = document.getElementById("finishOrderButton")

let allOrdersLength = 0
let orderConfig
async function loadOrders() {
    const allOrders = await findAll("orders")
    allOrdersLength = allOrders.length
    orderConfig = await findAll("orderConfig")
    finishOrderButton.textContent = "Finalizar Compra"
    finishOrderButton.addEventListener("click", () => { finishOrder() })

    for (let i = 0; i < orders.length; i++) {
        const orderRow = document.createElement("tr")

        const orderNumber = document.createElement("td")
        orderNumber.textContent = i + 1
        const orderContent = document.createElement("td")
        orderContent.textContent = orderConfig[orders[i]].name
        const orderPrice = document.createElement("td")
        orderPrice.textContent = `R$${orderConfig[orders[i]].price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`

        orderRow.appendChild(orderNumber)
        orderRow.appendChild(orderContent)
        orderRow.appendChild(orderPrice)
        orderList.appendChild(orderRow)
    }
}
loadOrders()

// const orderOptions = [
//     {
//         "order": "Espaguete",
//         "price": 35
//     },
//     {
//         "order": "Lasanha A Bolonhesa",
//         "price": 42.99
//     },
//     {
//         "order": "Risoto",
//         "price": 35
//     },
//     {
//         "order": "Torta De Limão",
//         "price": 15.99
//     },
//     {
//         "order": "Torta Salgada",
//         "price": 15.99
//     },
//     {
//         "order": "Feijoada",
//         "price": 48
//     }
// ]

async function finishOrder() {

    for (let i = 0; i < orders.length; i++) {
        await insertOne("orders", {
            "number": allOrdersLength + i,
            "userId": session.user.id,
            "userEmail": session.user.email,
            "order": orderConfig[orders[i]].name,
            "price": orderConfig[orders[i]].price,
            "status": "Pendente"
        })
    }

    alert("Compra finalizada com sucesso!")
    sessionStorage.setItem("orderChoices", [])
    while (orderList.children.length > 1) {
        orderList.removeChild(orderList.lastChild)
    }
}
