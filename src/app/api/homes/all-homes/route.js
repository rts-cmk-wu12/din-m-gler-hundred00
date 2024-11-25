export async function GET(request) {
    const { searchParams } = new URL(request.url)

    const limit = searchParams.get("limit")
    const start = searchParams.get("start")
    const type = searchParams.get("type_eq")
    const priceGte = searchParams.get("price_gte")
    const priceLte = searchParams.get("price_lte")

    let url = "https://dinmaegler.onrender.com/homes"
    const query = []

    if (limit) query.push(`_limit=${limit}`)
    if (start) query.push(`_start=${start}`)
    if (type) query.push(`type_eq=${type}`)
    if (priceGte) query.push(`price_gte=${priceGte}`)
    if (priceLte) query.push(`price_lte=${priceLte}`)
    if (query.length) url += `?${query.join("&")}`

    try {
        const response = await fetch(url, { method: "GET" })

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "failed to fetch homes" }), {
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
