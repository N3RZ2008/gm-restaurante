import { findAll } from "./database/useApi.js";
import { supabase } from "./supabaseConfig.js"

const { data: { session } } = await supabase.auth.getSession()

if (!session) {
    window.location.href = "../index.html"
}

const userId = session.user.id

const unfilteredOrders = await findAll("orders")
const orders = unfilteredOrders.filter(order => order.userId === userId)
const orderList = document.getElementById("orderList")

console.log(orders)

for (let i = 0; i < orders.length; i++) {
    const orderRow = document.createElement("tr")

    const orderNumber = document.createElement("td")
    orderNumber.textContent = orders[i].number
    const orderContent = document.createElement("td")
    orderContent.textContent = orders[i].order
    const orderStatus = document.createElement("td")
    orderStatus.textContent = orders[i].status
    const orderPrice = document.createElement("td")
    orderPrice.textContent = `R$${orders[i].price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`

    orderRow.appendChild(orderNumber)
    orderRow.appendChild(orderContent)
    orderRow.appendChild(orderStatus)
    orderRow.appendChild(orderPrice)
    orderList.appendChild(orderRow)
}