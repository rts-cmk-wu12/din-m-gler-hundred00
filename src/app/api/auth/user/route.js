import { cookies } from "next/headers"

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
        return new Response(JSON.stringify({ error: "no access" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        })
    }

    try {
        const response = await fetch("https://dinmaegler.onrender.com/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "failed to fetch user details" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            })
        }

        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error("Error fetching user:", error)
        return new Response(JSON.stringify({ error: "internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}
