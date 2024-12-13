"use client"

import { FaArrowRightLong } from "react-icons/fa6"
import { useState } from "react"
import { z } from "zod"

const emailSchema = z.string().email({ message: "Ugyldig email." })

export default function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [alreadySubscribed, setAlreadySubscribed] = useState(false)

    const handleSubscribe = async () => {
        setError("")
        setSuccess(false)

        const parsedEmail = emailSchema.safeParse(email.trim())

        if (!parsedEmail.success) {
            setError(parsedEmail.error.errors[0].message)
            return
        }

        try {
            const response = await fetch("https://dinmaegler.onrender.com/subscribers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: parsedEmail.data })
            })

            if (!response.ok) {
                if (response.status === 500) {
                    setAlreadySubscribed(true)
                    return
                }
                throw new Error("failed to subscribe. Prøv igen.")
            }

            setSuccess(true)
            setEmail("")
        } catch (error) {
            console.error("error subscribing to newsletter:", error)
            setError(error.message || "En ukendt fejl opstod. Prøv igen.")
        }
    }

    const handleUnsubscribe = async () => {
        setError("")
        setSuccess(false)

        try {
            const response = await fetch(`https://dinmaegler.onrender.com/subscribers/${email.trim()}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })

            const data = await response.json()

            if (!response.ok || data.length === 0) {
                throw new Error("error adding to list. user is most likely already on the list")
            }

            setAlreadySubscribed(false)
            setSuccess(true)
            setEmail("")
        } catch (error) {
            console.error("error unsubscribing from newsletter:", error)
            setError(error.message || "En ukendt fejl opstod. Prøv igen.")
        }
    }

    return (
        <article className="flex justify-center items-center relative w-full py-20 px-96">
            <div className="bg-newsletter-image bg-fit w-full h-full absolute opacity-10 z-20" />
            <div className="bg-slate-700 w-full h-full absolute z-10" />
            <section className="z-30 grid gap-5 items-center grid-cols-[1fr_auto] w-full max-w-4xl">
                <div>
                    <h5 className="text-2xl font-semibold text-white">
                        {success
                            ? "Tak for at tilmelde dig til vores nyhedsbrev!"
                            : alreadySubscribed
                                ? "Du har allerede tilmeldt dig vores nyhedsbrev."
                                : "Tilmeld dig vores nyhedsbrev og hold dig opdateret på boligmarkedet"}
                    </h5>
                </div>
                <div className="relative w-full max-w-md">
                    {alreadySubscribed ? (
                        <button
                            type="button"
                            onClick={handleUnsubscribe}
                            className="w-full py-4 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-sm px-36">
                            Afmeld
                        </button>
                    ) : (
                        <>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Indtast din email adresse"
                                className="w-full pl-4 pr-20 py-4 text-sm border border-gray-400 rounded-sm"
                            />
                            <button
                                type="button"
                                onClick={handleSubscribe}
                                className="absolute inset-y-0 right-3 flex items-center justify-center">
                                <FaArrowRightLong size={22} />
                            </button>
                        </>
                    )}
                </div>
            </section>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">Du er nu tilmeldt/afmeldt nyhedsbrevet!</p>}
        </article>
    )
}
