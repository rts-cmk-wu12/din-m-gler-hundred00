export async function GET(request) {
    const { searchParams } = new URL(request.url)

    const limit = searchParams.get("limit")
    const start = searchParams.get("start")

    let url = "https://dinmaegler.onrender.com/agents"
    const query = []

    if (limit) query.push(`_limit=${limit}`)
    if (start) query.push(`_start=${start}`)
    if (query.length) url += `?${query.join("&")}`

    try {
        const response = await fetch(url, { method: "GET" })

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "failed to fetch agents" }), {
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
