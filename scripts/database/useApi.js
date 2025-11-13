import { api } from "./api.js"

export async function findAll(coll) {
    try {
        const response = await fetch(`${api}/${coll}`)
        if (!response.ok) {
            throw new Error("HTTP Error status: ", response.status)
        }
        const data = response.json()
        return data
    } catch (error) {
        console.error('Error:', error)
    }
}

let test = await findAll("users")
console.log(test)