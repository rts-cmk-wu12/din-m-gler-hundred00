"use client"

import { useEffect, useState } from "react"

import TitleHeader from "@/components/common/TitleHeader"
import StatusMessage from "@/components/common/StatusMessage"
import AgentCard from "@/components/misc/AgentCard"

import { IoSearch } from "react-icons/io5"

export default function AgentPage({ params }) {
    const [agent, setAgent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const { agentId } = await params
                const response = await fetch(`/api/agents/${agentId}`)

                if (!response.ok) {
                    console.error("failed to fetch agent.")
                    setAgent(null)
                    return
                }

                const data = await response.json()
                setAgent(data)
            } catch (error) {
                console.error("error fetching agent:", error)
                setAgent(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchAgent()
    }, [params])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
        // logic here
    }

    if (isLoading) {
        return <StatusMessage messageText="Indlæser medarbejder detaljer..." messageIcon="loading" />
    }

    if (!agent) {
        return <StatusMessage messageText="Kunne ikke finde medarbejder." messageIcon="error" />
    }

    return (
        <main>
            <TitleHeader title="Kontakt en medarbejder" />
            <article className="px-96 py-24 flex gap-5">
                <section>
                    <AgentCard data={agent} extraInformation={true} />
                </section>
                <section className="flex flex-col gap-5">
                    <section className="bg-blue-50 flex flex-col gap-3 p-5 rounded-sm">
                        <p className="text-lg font-semibold">Søg efter boligere</p>
                        <hr />
                        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 p-2">
                            <div className="relative">
                                <IoSearch className="fill-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" size={20} />
                                <input
                                    type="text"
                                    placeholder="Søg"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="min-w-20 text-gray-500 border-[1px] border-gray-300 shadow-sm rounded-sm p-2 pl-8"
                                />
                            </div>
                        </form>
                    </section>
                    <section className="bg-commonBlue text-white flex flex-col gap-2 px-10 py-20 rounded-sm items-center justify-center text-center">
                        <p className="font-semibold text-2xl">Find The Best Property For Rent Or Buy</p>
                        <div className="h-[3px] w-[30%] bg-blue-50 my-2"/> {/* cant use hr because hr breaks in a flex container */}
                        <p className="text-sm">Call Us Now</p>
                        <p className="font-semibold text-2xl">+00 123 456 789</p>
                    </section>
                </section>
            </article>
        </main>
    )
}
