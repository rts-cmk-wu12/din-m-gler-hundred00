import { useState, useEffect } from "react"
import { FaRegHeart, FaHeart } from "react-icons/fa"

export default function FavouriteButton({ type, homeId }) {
    const [isFavorited, setIsFavorited] = useState(false)
    const [allFavorites, setAllFavorites] = useState([])

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch("/api/auth/user", { method: "GET" })

                if (!response.ok) {
                    throw new Error("failed to fetch user data.")
                }

                const userData = await response.json()
                const favorites = userData.homes || []
                setAllFavorites(favorites)

                if (favorites.includes(homeId)) {
                    setIsFavorited(true)
                }
            } catch (error) {
                console.error("error fetching favorites:", error)
            }
        }

        fetchFavorites()
    }, [homeId])

    const handleToggleFavorite = async () => {
        try {
            const updatedFavorites = isFavorited
                ? allFavorites.filter((id) => id !== homeId)
                : [...allFavorites, homeId]

            const response = await fetch("/api/homes/favourite", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ homeId })
            })

            if (!response.ok) {
                throw new Error("failed to update favorites.")
            }

            setAllFavorites(updatedFavorites)
            setIsFavorited(!isFavorited)
        } catch (error) {
            console.error("error toggling favorite status:", error)
        }
    }

    if (type === "search") {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleToggleFavorite()
                }}
                className={`absolute p-2 flex items-center justify-center ml-[22rem] mt-2 rounded-full duration-150 ${
                    isFavorited ? "bg-red-500" : "bg-white hover:bg-red-500"
                }`}
            >
                {isFavorited ? (
                    <FaHeart className="fill-white w-full h-full" />
                ) : (
                    <FaRegHeart className="fill-black hover:fill-white w-full h-full duration-150" />
                )}
            </button>
        )
    }

    if (type === "favourites") {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    console.log("meh")
                }}
                className="text-white bg-commonBlue p-4 rounded-base font-semibold"
            >
                Fjern fra favoritter
            </button>
        )
    }

    return null
}
