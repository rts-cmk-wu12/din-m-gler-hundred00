"use client"

import { useEffect, useState } from "react";
import TitleHeader from "@/components/common/TitleHeader";
import ResultFrame from "@/components/search/Result";
import SearchOptions from "@/components/search/SearchOptions";
import StatusMessage from "@/components/common/StatusMessage";

export default function SearchPage() {
    const [homes, setHomes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const dropdownOptions = ["Alle", "Villa", "Ejerlejlighed", "Byhus", "Landejendom"]
    const sliderProps = {
        lowest: 0,
        highest: 12000000,
        value: 6000000
    }

    const [filters, setFilters] = useState({
        type: dropdownOptions[0],
        priceRange: { min: sliderProps.lowest, max: sliderProps.value }
    })

    const fetchHomes = async () => {
        setIsLoading(true)
        try {
            const { type, priceRange } = filters
            const query = new URLSearchParams({
                price_gte: priceRange.min,
                price_lte: priceRange.max,
                ...(type !== "Alle" && { type_eq: type })
            }).toString()

            const response = await fetch(`/api/homes/all-homes?${query}`)
            if (!response.ok) {
                console.error("failed to fetch homes")
                return
            }

            const data = await response.json()
            setHomes(data)
        } catch (error) {
            console.error("error fetching homes:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchHomes()
    }, [filters])

    return (
        <main>
            <TitleHeader title={"Boliger til salg"} />
            <article className="bg-gray-50 flex flex-col justify-between items-center gap-16 pt-20">
                <section className="flex flex-col gap-5">
                    <h2 className="text-xl font-semibold">Søg efter dit drømmehus</h2>
                    <SearchOptions
                        dropdownOptions={dropdownOptions}
                        sliderProps={sliderProps}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </section>
                {isLoading ? (
                    <StatusMessage messageText="Indlæser boliger..." messageIcon="loading" />
                ) : homes.length === 0 ? (
                    <StatusMessage messageText="Ingen boliger fundet med din søgning." messageIcon="error" />
                ) : null}
                <section className="grid grid-cols-2 gap-6 pb-32">
                    {!isLoading &&
                        homes.length > 0 &&
                        homes.map((home) => (
                            <ResultFrame key={home.id} type={"search"} includeFavourite={true} data={home} />
                        ))}
                </section>
            </article>
        </main>
    )
}
