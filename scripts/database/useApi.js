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

export async function findOne(coll, search) {
    try {
        const response = await fetch(`${api}/${coll}/${search}`)
        if (!response.ok) {
            throw new Error("HTTP Error status: ", response.status)
        }
        const data = response.json()
        return data
    } catch (error) {
        console.error('Error:', error)
    }
}

export async function insertOne(coll, data) {
    try {
        const response = await fetch(`${api}/${coll}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("HTTP Error status: ", response.status)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

export async function updateOne(coll, search, data) {
    try {
        const response = await fetch(`${api}/${coll}/${search}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("HTTP Error status: ", response.status)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

export async function deleteOne(coll, search) {
    try {
        const response = await fetch(`${api}/${coll}/${search}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("HTTP Error status: ", response.status)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}
