import { cookies } from "next/headers";

export async function PUT(request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth_token")?.value
        const userId = cookieStore.get("user_id")?.value

        if (!token || !userId) {
            return new Response(
                JSON.stringify({ error: "missing access token or user id" }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }

        const { homeId, action } = await request.json()

        if (!homeId || !["add", "remove"].includes(action)) {
            return new Response(
                JSON.stringify({ error: "homeId and valid action ('add' or 'remove') are required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }

        const userResponse = await fetch("https://dinmaegler.onrender.com/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!userResponse.ok) {
            console.error("failed to fetch user data:", await userResponse.text())
            return new Response(
                JSON.stringify({ error: "failed to fetch user data" }),
                {
                    status: userResponse.status,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }

        const userData = await userResponse.json()
        const currentFavorites = userData.homes || []

        let updatedFavorites
        if (action === "add") {
            updatedFavorites = [...new Set([...currentFavorites, homeId])] // add homeid
        } else if (action === "remove") {
            updatedFavorites = currentFavorites.filter((id) => id !== homeId) // remove homeid
        }

        const updateResponse = await fetch(`https://dinmaegler.onrender.com/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ homes: updatedFavorites })
        })

        if (!updateResponse.ok) {
            console.error("failed to update favorites:", await updateResponse.text())
            return new Response(
                JSON.stringify({ error: "failed to update favorites" }),
                {
                    status: updateResponse.status,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }

        return new Response(
            JSON.stringify({ message: "favorites updated successfully" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )
    } catch (error) {
        console.error("error updating favorites:", error)
        return new Response(
            JSON.stringify({ error: "internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        )
    }
}
