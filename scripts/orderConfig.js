import { deleteOne, findAll, findOne, insertOne, updateOne } from "./database/useApi.js";
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

let orderConfig = await findAll("orderConfig")
const orderList = document.getElementById("orderList")

async function loadOrders() {
    orderConfig = await findAll("orderConfig")
    while (orderList.children.length > 1) {
        orderList.removeChild(orderList.lastChild)
    }
    for (let i = 0; i < orderConfig.length; i++) {
        const orderRow = document.createElement("tr")

        const orderNumber = document.createElement("td")
        orderNumber.textContent = orderConfig[i].number

        const orderName = document.createElement("td")
        const orderNameInput = document.createElement("input")
        orderNameInput.value = orderConfig[i].name
        orderName.appendChild(orderNameInput)

        const orderPrice = document.createElement("td")
        const orderPriceInput = document.createElement("input")
        orderPriceInput.value = orderConfig[i].price
        orderPrice.appendChild(orderPriceInput)

        const orderImage = document.createElement("td")
        const orderImageInput = document.createElement("select")
        const option0 = new Option("0", "0")
        const option1 = new Option("1", "1")
        const option2 = new Option("2", "2")
        const option3 = new Option("3", "3")
        const option4 = new Option("4", "4")
        const option5 = new Option("5", "5")

        orderImageInput.add(option0)
        orderImageInput.add(option1)
        orderImageInput.add(option2)
        orderImageInput.add(option3)
        orderImageInput.add(option4)
        orderImageInput.add(option5)
        orderImageInput.value = orderConfig[i].imageId
        orderImage.appendChild(orderImageInput)

        const orderEdit = document.createElement("td")
        const orderEditButton = document.createElement("button")
        orderEditButton.textContent = "Editar"
        orderEditButton.addEventListener("click", function (event) {
            editOrder(
                event,
                orderConfig[i].number,
                orderConfig[i].imageId,
                orderImageInput.value,
                orderConfig[i].name,
                orderNameInput.value,
                orderConfig[i].price,
                orderPriceInput.value
            )
        })
        orderEdit.appendChild(orderEditButton)

        const orderDelete = document.createElement("td")
        const orderDeleteButton = document.createElement("button")
        orderDeleteButton.textContent = "Remover"
        orderDeleteButton.addEventListener("click", function (event) {
            deleteOrder(event, orderConfig[i].number)
        })
        orderDelete.appendChild(orderDeleteButton)

        orderRow.appendChild(orderNumber)
        orderRow.appendChild(orderName)
        orderRow.appendChild(orderPrice)
        orderRow.appendChild(orderImage)
        orderRow.appendChild(orderEdit)
        orderRow.appendChild(orderDelete)
        orderList.appendChild(orderRow)
    }
}
loadOrders()

function editOrder(event, orderNumber, orderImage, newOrderImage, orderName, newOrderName, orderPrice, newOrderPrice) {
    if (orderImage == newOrderImage &&
        orderName == newOrderName &&
        orderPrice == newOrderPrice
    ) return

    const dataInsert = {
        imageId: Number(newOrderImage),
        name: newOrderName,
        price: Number(newOrderPrice)
    }

    console.log(orderNumber)
    console.log(dataInsert)

    updateOne("orderConfig", orderNumber, dataInsert)
    alert("Editado com sucesso!")
    loadOrders()
}

function deleteOrder(event, orderNumber) {
    let userConfirmed = confirm("Deseja mesmo remover este pedido?")
    if (!userConfirmed) return

    deleteOne("orderConfig", orderNumber)
    alert("Removido com sucesso!")
    loadOrders()
}

async function addOrder() {
    const dataInsert = {
        number: orderConfig.length,
        imageId: 0,
        name: "Insira o Nome",
        price: 0
    }

    await insertOne("orderConfig", dataInsert)
    alert("Adicionado com sucesso!")
    loadOrders()
}

const addOrderButton = document.getElementById("addOrderButton")
addOrderButton.addEventListener("click", () => {
    addOrder()
})