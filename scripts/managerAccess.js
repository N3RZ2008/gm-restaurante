import { findAll, updateOne } from "./database/useApi.js";

const users = await findAll("users")
const userList = document.getElementById("userList")

function editUser(event, userId, userRole, newUserRole) {
    if (userRole === newUserRole) return

    const dataInsert = {
        role: newUserRole
    }

    updateOne("users", userId, dataInsert)
}

for (let i = 0; i < users.length; i++) {
    const userRow = document.createElement("tr")

    const userEmail = document.createElement("td")
    userEmail.textContent = users[i].email

    const userRole = document.createElement("td")
    const userRoleInput = document.createElement("select")
    const optionUser = new Option("User", "user")
    const optionWorker = new Option("Worker", "worker")
    const optionManager = new Option("Manager", "manager")
    userRoleInput.add(optionUser)
    userRoleInput.add(optionWorker)
    userRoleInput.add(optionManager)
    userRoleInput.value = users[i].role
    if (users[i].role === "manager") userRoleInput.disabled = true
    userRole.appendChild(userRoleInput)

    const userEdit = document.createElement("td")
    const userEditButton = document.createElement("button")
    userEditButton.textContent = "Edit"
    userEditButton.addEventListener("click", function(event) {
        editUser(event, users[i].userId, users[i].role, userRoleInput.value)
    })
    userEdit.appendChild(userEditButton)

    userList.appendChild(userRow)
    userRow.appendChild(userEmail)
    userRow.appendChild(userRole)
    userRow.appendChild(userEdit)
}