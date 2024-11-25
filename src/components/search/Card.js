"use client"

import { useState } from "react"

export default function Card() {
    const [query, setQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("search query:", query)
    }
    return (
        <div className="bg-white p-7 w-full">
            <p className="text-lg pb-6">Søg blandt 158 boliger til salg i 74 butikker </p>
            <p className="text-gray-600 pb-2">Hvad skal din næste bolig indeholde</p>
            <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                    className="px-4 py-2 border border-gray-300 w-full rounded-[0.160rem] text-sm"/>
                <button
                    type="submit"
                    className="px-10 py-[0.70rem] text-white bg-commonBlue rounded-[0.160rem] text-sm">
                    Søg
                </button>
            </form>
        </div>
    )
}