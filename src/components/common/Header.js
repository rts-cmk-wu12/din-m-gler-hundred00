"use client"

import Link from "next/link"
import { FaPaperPlane, FaUser } from "react-icons/fa6"
import { MdLocalPhone } from "react-icons/md"
import { useEffect, useState } from "react"

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/user", { method: "GET" })
                if (response.ok) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error("error checking auth:", error)
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const handleLogout = async () => {
        console.log("logging out")
    }

    return (
        <header>
            <article className="bg-commonBlue text-white flex items-center justify-between py-3 px-80 text-sm">
                <section className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <FaPaperPlane color="white" size={20} />
                        <a href="mailto:4000@dinmaegler.com">4000@dinmaegler.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdLocalPhone color="white" size={25} />
                        <p>+45 7070 4000</p>
                    </div>
                </section>
                <section className="flex items-center gap-2">
                    <FaUser color="white" size={15} />
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-1 px-3 rounded-md"
                        >
                            Log Ud
                        </button>
                    ) : (
                        <Link href="/login">Log ind</Link>
                    )}
                </section>
            </article>

            <article className="bg-white flex items-center justify-between py-3 px-80 text-md">
                <Link href="/">
                    <section className="text-commonBlue font-bold flex items-baseline text-4xl gap-2">
                        <img src="/images/logo.svg" alt="Din Mægler logo af to huse" />
                        <h2 className="uppercase">Din Mægler</h2>
                    </section>
                </Link>
                <nav className="text-[#333333] flex gap-8">
                    <Link href="/search">Boliger til salg</Link>
                    <Link href="/agents">Mæglere</Link>
                    <Link href="/favourites">Mine favoritter</Link>
                    <Link href="/contact">Kontakt os</Link>
                </nav>
            </article>
        </header>
    )
}
