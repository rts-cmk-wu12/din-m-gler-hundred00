import { cookies } from "next/headers"

export async function POST(request) {
    const { email, password } = await request.json()

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "email and password is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        })
    }

    try {
        const response = await fetch("https://dinmaegler.onrender.com/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ identifier: email, password })
        })

        if (!response.ok) {
            const { error } = await response.json()
            return new Response(JSON.stringify({ error }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            })
        }

        const data = await response.json()
        const { jwt } = data

        const userResponse = await fetch("https://dinmaegler.onrender.com/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!userResponse.ok) {
            return new Response(JSON.stringify({ error: "failed to fetch user data" }), {
                status: userResponse.status,
                headers: { "Content-Type": "application/json" }
            })
        }

        const userData = await userResponse.json()
        const { id: userId } = userData

        const cookieStore = await cookies()
        cookieStore.set("auth_token", jwt, {
            maxAge: 60 * 60,
            httpOnly: true,
            path: "/"
        })
        cookieStore.set("user_id", userId, {
            maxAge: 60 * 60,
            httpOnly: true,
            path: "/"
        })

        return new Response(null, { status: 204 })
    } catch (error) {
        console.error("error during login: ", error)
        return new Response(JSON.stringify({ error: "internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}
