import { FaRegHeart, FaHeart } from "react-icons/fa"

export default function FavouriteButton({ type, homeId, userFavorites = [], setUserFavorites }) {
    if (type === "favourites") {
        return (
            <button className="text-white bg-commonBlue p-4 rounded-base font-semibold">
                Fjern fra favoritter
            </button>
        )
    }

    if (type === "search") {
        const isFavorited = userFavorites.includes(homeId)

        const handleToggleFavorite = async () => {
            try {
                const updatedFavorites = isFavorited
                    ? userFavorites.filter((id) => id !== homeId)
                    : [...userFavorites, homeId]

                const response = await fetch("/api/homes/favourite", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ homeId }),
                })

                if (!response.ok) {
                    throw new Error("failed to update favorites.")
                }

                setUserFavorites(updatedFavorites)
            } catch (error) {
                console.error("error toggling favorite status:", error)
            }
        }

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

    return null
}
