"use client"

import { useState } from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import StatusMessage from "@/components/common/StatusMessage"
import Link from "next/link"
import TitleHeader from "@/components/common/TitleHeader"

const loginSchema = z.object({
    email: z.string().email("Ugyldig email"),
    password: z.string().min(1, "Adgangskode er påkrævet")
})

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    async function handleLogin(event) {
        event.preventDefault()
        setError(null)

        const formData = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        const validation = loginSchema.safeParse(formData)
        if (!validation.success) {
            setError(validation.error.flatten().fieldErrors)
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                const { error } = await response.json()
                setError({ global: [error || "Noget gik galt. Prøv igen."] })
                return
            }

            router.push("/")
        } catch (err) {
            setError({ global: ["Noget gik galt. Prøv igen senere."] })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main>
            <TitleHeader title="Account Login" />
            <article className="flex items-center justify-center py-24 px-[35rem]">
                <section className="bg-white py-14 px-36 border-gray-200 border-[1px] rounded-sm shadow-sm flex items-center justify-center flex-col gap-10 w-full">
                    <h2 className="text-center text-2xl text-commonBlue font-semibold">Log ind på din konto</h2>
                    {error?.global && <StatusMessage messageText={error.global[0]} messageIcon="error" />}
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                        <section className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-md text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="border-gray-200 border-[1px] rounded-sm text-gray-600 p-3 w-full"
                                placeholder="Email"
                            />
                            {error?.email && <p className="text-red-500 text-sm">{error.email[0]}</p>}
                        </section>
                        <section className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-md text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border-gray-200 border-[1px] rounded-sm text-gray-600 p-3 w-full"
                                placeholder="Password"
                            />
                            {error?.password && <p className="text-red-500 text-sm">{error.password[0]}</p>}
                        </section>
                        <button
                            type="submit"
                            className="p-3 bg-commonBlue text-white text-center w-full font-semibold rounded-sm"
                            disabled={loading}>
                            {loading ? "Logger ind..." : "Log ind"}
                        </button>
                        <section className="flex flex-col gap-2 mt-4">
                            <label htmlFor="email" className="text-md text-gray-600">Log ind med</label>
                            <div className="flex gap-4">
                                <button className="py-4 bg-[#DD4B39] text-white text-center w-full font-semibold rounded-sm">Google</button>
                                <button className="py-4 bg-[#3B5999] text-white text-center w-full font-semibold rounded-sm">Facebook</button>
                                <button className="py-4 bg-commonBlue text-white text-center w-full font-semibold rounded-sm">Twitter</button>
                            </div>
                        </section>
                    </form>
                    <div className="flex gap-1 text-center text-md text-gray-700">
                        <p>Har du ikke en konto?</p><Link href="/signup" className="text-blue-400 no-underline">Opret bruger.</Link>
                    </div>
                </section>
            </article>
        </main>
    )
}
