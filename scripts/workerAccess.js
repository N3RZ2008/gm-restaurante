import { findAll, findOne, updateOne } from "./database/useApi.js";
import { supabase } from "./supabaseConfig.js";

const { data: { session } } = await supabase.auth.getSession()

async function verifyRole() {
    try {
        const userSelected = await findOne("users", session.user.id)
        if (userSelected.role === "user") {
            window.location.href = "../index.html"
        }
    } catch (error) {
        window.location.href = "../index.html"
    }

}
verifyRole()

const orders = await findAll("orders")
const orderList = document.getElementById("orderList")

function editOrder(event, orderNumber, orderStatus, newOrderStatus) {
    if (orderStatus === newOrderStatus) return

    const dataInsert = {
        role: newOrderStatus
    }

    updateOne("users", orderNumber, dataInsert)
    alert("Editado com sucesso!")
}

for (let i = 0; i < orders.length; i++) {
    const orderRow = document.createElement("tr")

    const orderNumber = document.createElement("td")
    orderNumber.textContent = orders[i].number
    const orderContent = document.createElement("td")
    orderContent.textContent = orders[i].order

    const orderStatus = document.createElement("td")
    const orderStatusInput = document.createElement("select")
    const optionPendente = new Option("Pendente", "Pendente")
    const optionConcluido = new Option("Concluído", "Concluido")
    const optionCancelado = new Option("Cancelado", "Cancelado")

    orderStatusInput.add(optionPendente)
    orderStatusInput.add(optionConcluido)
    orderStatusInput.add(optionCancelado)
    orderStatusInput.value = orders[i].status
    orderStatus.appendChild(orderStatusInput)

    const orderPrice = document.createElement("td")
    orderPrice.textContent = `R$${orders[i].price.toFixed(2)}`

    const orderEdit = document.createElement("td")
    const orderEditButton = document.createElement("button")
    orderEditButton.textContent = "Edit"
    orderEditButton.addEventListener("click", function (event) {
        editOrder(event, orders[i].number, orders[i].status, orderStatusInput.value)
    })
    orderEdit.appendChild(orderEditButton)

    orderRow.appendChild(orderNumber)
    orderRow.appendChild(orderContent)
    orderRow.appendChild(orderStatus)
    orderRow.appendChild(orderPrice)
    orderRow.appendChild(orderEdit)
    orderList.appendChild(orderRow)
}