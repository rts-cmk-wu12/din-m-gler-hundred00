"use client"

import { useState } from "react"

import { HiOutlinePhoto } from "react-icons/hi2"
import { IoLayersOutline } from "react-icons/io5"
import { FiMapPin, FiHeart } from "react-icons/fi"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import FavouriteButton from "./FavouriteButton"

export default function ImageViewer({ visible, onClose, data = {}, favourited }) {
    if (!visible) return null

    const mainImageUrl = data?.images?.[0]?.url || "/images/placeholder.jpg"
    const floorplanImageUrl = data?.floorplan?.url || "/images/placeholder.jpg"
    const mapImageUrl = "/images/image-viewer/map-mockup.jpg"

    const [currentImageUrl, setCurrentImageUrl] = useState(mainImageUrl)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showArrows, setShowArrows] = useState(true)

    const images = data?.images || []

    const goToNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        setCurrentImageUrl(images[(currentIndex + 1) % images.length]?.url)
    }

    const goToPreviousImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
        setCurrentImageUrl(images[(currentIndex - 1 + images.length) % images.length]?.url)
    }

    const handleImageClick = (url) => {
        if (url === floorplanImageUrl || url === mapImageUrl) {
            setShowArrows(false)
        } else {
            setShowArrows(true)
        }
        setCurrentImageUrl(url)
    }

    return (
        <div className="relative">
            <div
                className="fixed inset-0 bg-zinc-900 bg-opacity-80 backdrop-blur-md z-10"
                onClick={onClose}
            ></div>

            <div className="fixed top-0 left-0 w-full p-4 z-20 flex flex-col gap-4">
                <div className="flex items-center gap-4 flex-col relative">
                    {showArrows && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer" onClick={goToPreviousImage}>
                            <FaArrowLeft color="#7B7B7B" size={50} />
                        </div>
                    )}

                    {showArrows && (
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer" onClick={goToNextImage}>
                            <FaArrowRight color="#7B7B7B" size={50} />
                        </div>
                    )}

                    <img
                        src={currentImageUrl}
                        alt="Billede af huset"
                        className="max-h-[40em] object-cover"
                    />

                    <div className="flex gap-4 mt-4">
                        <button onClick={() => handleImageClick(mainImageUrl)}>
                            <HiOutlinePhoto color="#7B7B7B" size={50} />
                        </button>
                        <button onClick={() => handleImageClick(floorplanImageUrl)}>
                            <IoLayersOutline color="#7B7B7B" size={50} />
                        </button>
                        <button  onClick={() => handleImageClick(mapImageUrl)}>
                            <FiMapPin color="#7B7B7B" size={50} />
                        </button>
                        <FavouriteButton type={"imageViewer"} setUserFavorites={favourited} homeId={data.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}