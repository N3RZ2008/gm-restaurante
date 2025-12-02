import { findAll, insertOne } from "./database/useApi.js"
import { supabase } from "./supabaseConfig.js"

const { data: { session } } = await supabase.auth.getSession()
const orders = JSON.parse(sessionStorage.getItem("orderChoices"))

const orderList = document.getElementById("orderList")
const finishOrderButton = document.getElementById("finishOrderButton")

let allOrdersLength = 0
async function loadOrders() {
    const allOrders = await findAll("orders")
    allOrdersLength = allOrders.length
    finishOrderButton.textContent = "Confirmar Dados"
    finishOrderButton.addEventListener("click", () => { finishOrder() })
}
loadOrders()

const orderOptions = [
    {
        "userId": session.user.id,
        "order": "Espaguete",
        "price": 35
    },
    {
        "userId": session.user.id,
        "order": "Lasanha A Bolonhesa",
        "price": 42.99
    },
    {
        "userId": session.user.id,
        "order": "Risoto",
        "price": 35
    },
    {
        "userId": session.user.id,
        "order": "Torta De Limão",
        "price": 15.99
    },
    {
        "userId": session.user.id,
        "order": "Torta Salgada",
        "price": 15.99
    },
    {
        "userId": session.user.id,
        "order": "Feijoada",
        "price": 48
    }
]

for (let i = 0; i < orders.length; i++) {
    const orderRow = document.createElement("tr")

    const orderNumber = document.createElement("td")
    orderNumber.textContent = i+1
    const orderContent = document.createElement("td")
    orderContent.textContent = orderOptions[orders[i]].order
    const orderPrice = document.createElement("td")
    orderPrice.textContent = `R$${orderOptions[orders[i]].price.toFixed(2)}`

    orderRow.appendChild(orderNumber)
    orderRow.appendChild(orderContent)
    orderRow.appendChild(orderPrice)
    orderList.appendChild(orderRow)
}

async function finishOrder() {
    for (let i = 0; i < orders.length; i++) {
        await insertOne("orders", {
            "number": allOrdersLength+i,
            "userId": session.user.id,
            "order": orderOptions[orders[i]].order,
            "price": orderOptions[orders[i]].price,
            "status": "Pendente"
        })
    }

    alert("Compra finalizada com sucesso!")
    sessionStorage.setItem("orderChoices", [])
    while (orderList.children.length > 1) {
        orderList.removeChild(orderList.lastChild)
    }
}
