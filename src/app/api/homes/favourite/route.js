import { cookies } from "next/headers"

export async function PUT(request) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
        return new Response(JSON.stringify({ error: "unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        })
    }

    try {
        const { homeId } = await request.json()

        if (!homeId) {
            return new Response(JSON.stringify({ error: "home ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            })
        }

        const userResponse = await fetch("https://dinmaegler.onrender.com/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!userResponse.ok) {
            return new Response(JSON.stringify({ error: "failed to fetch user details" }), {
                status: userResponse.status,
                headers: { "Content-Type": "application/json" }
            })
        }

        const user = await userResponse.json()

        const updatedHomes = [...new Set([...(user.homes || []), homeId])]

        const updateResponse = await fetch(`https://dinmaegler.onrender.com/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ homes: updatedHomes })
        })

        if (!updateResponse.ok) {
            return new Response(JSON.stringify({ error: "failed to update favorites" }), {
                status: updateResponse.status,
                headers: { "Content-Type": "application/json" }
            })
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    } catch (error) {
        console.error("Error updating favorites:", error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}