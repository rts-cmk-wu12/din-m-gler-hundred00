"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";

export default function FavouriteButton({ type, homeId, userFavorites = [], setUserFavorites, handleRemove }) {
    const [internalFavorited, setInternalFavorited] = useState(
        typeof setUserFavorites === "boolean" ? setUserFavorites : userFavorites.includes(homeId)
    )

    const isFavorited = typeof setUserFavorites === "boolean" 
        ? internalFavorited 
        : userFavorites.includes(homeId)

    const handleToggleFavorite = async () => {
        try {
            const updatedFavorites = typeof setUserFavorites === "boolean"
                ? !isFavorited
                : isFavorited
                    ? userFavorites.filter((id) => id !== homeId)
                    : [...userFavorites, homeId]

            const response = await fetch("/api/homes/favourite", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ homeId, action: isFavorited ? "remove" : "add" })
            })

            if (!response.ok) {
                throw new Error("failed to update favorites.")
            }

            if (typeof setUserFavorites === "function") {
                setUserFavorites(updatedFavorites)
            } else {
                setInternalFavorited(!isFavorited)
            }
        } catch (error) {
            console.error("error toggling favorite status:", error)
        }
    }

    if (type === "favourites") {
        const handleRemoveFavorite = async () => {
            try {
                const response = await fetch("/api/homes/favourite", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ homeId, action: "remove" }),
                })

                if (!response.ok) {
                    throw new Error("failed to remove favorite.")
                }

                if (handleRemove) {
                    handleRemove(homeId)
                }
            } catch (error) {
                console.error("error removing favorite:", error)
            }
        }

        return (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFavorite()
                }}
                className="text-white bg-commonBlue p-4 rounded-base font-semibold">
                Fjern fra favoritter
            </button>
        )
    }

    if (type === "search") {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleToggleFavorite()
                }}
                className={`absolute p-2 flex items-center justify-center ml-[22rem] mt-2 rounded-full duration-150 ${isFavorited ? "bg-red-500" : "bg-white hover:bg-red-500"}`}>
                {isFavorited ? (
                    <FaHeart className="fill-white w-full h-full" />
                ) : (
                    <FaRegHeart className="fill-black hover:fill-white w-full h-full duration-150" />
                )}
            </button>
        )
    }

    if (type === "imageViewer") {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleToggleFavorite()
                }}
                className="p-2 flex items-center justify-center duration-150">
                <FiHeart color={isFavorited ? "red" : "#7B7B7B"} size={50} />
            </button>
        )
    }

    return null
}
