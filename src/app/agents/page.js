"use client"

import StatusMessage from "@/components/common/StatusMessage";
import TitleHeader from "@/components/common/TitleHeader";
import EmployeeCard from "@/components/misc/EmployeeCard";

import { useEffect, useState } from "react";

export default function agentsPage() {
    const [agents, setAgents] = useState([])
    const [isLoadingAgents, setIsLoadingAgents] = useState(true)

    useEffect(() => {
        async function fetchAgents() {
            try {
                const response = await fetch("/api/agents/all-agents?limit=6")
                if (!response.ok) {
                    console.error("failed to fetch agents")
                    return
                }
                const data = await response.json()
                setAgents(data)
            } catch (error) {
                console.error("error fetching agents:", error)
            } finally {
                setIsLoadingAgents(false)
            }
        }

        fetchAgents()
    }, [])

    return (
        <main>
            <TitleHeader title="Medarbejdere i Roskilde" />
            <article className="px-10 py-24">
                {isLoadingAgents ? (
                    <StatusMessage messageText="Indlæser mæglere..." messageIcon="loading" />
                ) : agents.length === 0 ? (
                    <StatusMessage messageText="Kunne ikke finde mæglere lige nu..." messageIcon="error" />
                ) : null}
                <section className="grid grid-cols-3 gap-6 px-80">
                    {!isLoadingAgents &&
                        agents.length > 0 &&
                        agents.map((agent) => <EmployeeCard key={agent.id} data={agent} />)}
                </section>
            </article>
        </main>
    )
}