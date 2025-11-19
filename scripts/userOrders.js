import { findAll } from "./database/useApi.js";

const orders = await findAll("orders")
const orderList = document.getElementById("userList")

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
    orderPrice.textContent = `R$${orders[i].price.toFixed(2)}`

    orderRow.appendChild(orderNumber)
    orderRow.appendChild(orderContent)
    orderRow.appendChild(orderStatus)
    orderRow.appendChild(orderPrice)
    orderList.appendChild(orderRow)
}