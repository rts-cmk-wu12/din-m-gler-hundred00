export async function GET(request, context) {
    const { homeId } = await context.params

    if (!homeId) {
        return new Response(JSON.stringify({ error: "home id is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        })
    }

    const url = `https://dinmaegler.onrender.com/homes/${homeId}`

    try {
        const response = await fetch(url, { method: "GET" })

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "failed to fetch home" }), {
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