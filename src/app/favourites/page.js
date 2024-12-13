"use client"

import { useEffect, useState } from "react"
import StatusMessage from "@/components/common/StatusMessage"
import TitleHeader from "@/components/common/TitleHeader"
import ResultFrame from "@/components/search/Result"

import { IoSearch } from "react-icons/io5"

export default function FavouritesPage() {
    const [allFavorites, setAllFavorites] = useState([])
    const [filteredFavorites, setFilteredFavorites] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const userResponse = await fetch("/api/auth/user", { method: "GET" })

                if (!userResponse.ok) {
                    const errorData = await userResponse.json()
                    throw new Error(errorData.error || "failed to fetch user data.")
                }

                const userData = await userResponse.json()
                const homeIds = userData.homes || []

                const homeFetchPromises = homeIds.map((homeId) =>
                    fetch(`/api/homes/${homeId}`).then((res) => {
                        if (!res.ok) {
                            throw new Error(`failed to fetch home with id: ${homeId}`)
                        }
                        return res.json()
                    })
                )

                const detailedHomes = await Promise.all(homeFetchPromises)

                setAllFavorites(detailedHomes)
                setFilteredFavorites(detailedHomes)
            } catch (err) {
                console.error("error fetching favorites:", err.message)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [])

    const handleRemoveFavorite = (homeId) => {
        const updatedFavorites = allFavorites.filter((home) => home.id !== homeId)
        setAllFavorites(updatedFavorites)
        setFilteredFavorites(updatedFavorites)
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase()
        setSearchQuery(query)

        const filtered = allFavorites.filter((home) =>
            home.adress1.toLowerCase().includes(query)
        )

        setFilteredFavorites(filtered)
    }

    if (loading) {
        return <StatusMessage type="loading" message="Indlæser dine boliger..." />
    }

    if (error) {
        return <StatusMessage type="error" message={`Fejl: ${error}`} />
    }

    if (allFavorites.length === 0) {
        return <StatusMessage type="info" message="Du har ikke nogen favoritboliger." />
    }

    return (
        <main>
            <TitleHeader title="Mine favoritboliger" />
            <article className="flex items-center justify-center flex-col py-24 px-[30rem] gap-6">
                <section className="w-full grid grid-cols-1 place-items-start">
                    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 p-2 border-[1px] border-gray-200 shadow-sm rounded-sm">
                        <IoSearch className="fill-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Søg i favoritter"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="min-w-20 text-gray-400"
                        />
                    </form>
                </section>

                <hr className="border-0 w-full bg-gray-200 h-[1px] mb-6" />

                <section className="w-full grid grid-cols-1 gap-4">
                    {filteredFavorites.map((home) => (
                        <ResultFrame key={home.id} type="favourites" includeFavourite={true} data={home} handleRemove={handleRemoveFavorite} />
                    ))}
                </section>
            </article>
        </main>
    )
}
