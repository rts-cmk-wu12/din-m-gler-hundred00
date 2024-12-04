import { cookies } from "next/headers"

export async function GET() {
    const token = cookies().get("auth_token")?.value

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
            return new Response(JSON.stringify({ error: "failed to get user details" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            })
        }

        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}
