"use client"

import { IoMdArrowDropdown } from "react-icons/io"
import { useState, useEffect, useRef } from "react"

import { formatNumber } from "@/utils/formatNumber";

export default function SearchOptions({ dropdownOptions, sliderProps, filters, setFilters }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(filters.type || "Alle")
    const [sliderValue, setSliderValue] = useState(filters.priceRange.max)

    const debounceTimeout = useRef(null)

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
        setFilters((prev) => ({
            ...prev,
            type: option === "Alle" ? null : option
        }))
        setIsDropdownOpen(false)
    }

    const handleSliderChange = (e) => {
        const value = Number(e.target.value)
        setSliderValue(value)

        clearTimeout(debounceTimeout.current)
        debounceTimeout.current = setTimeout(() => {
            setFilters((prev) => ({
                ...prev,
                priceRange: { ...prev.priceRange, max: value }
            }))
        }, 300)
    }

    useEffect(() => {
        setSelectedOption(filters.type || "Alle")
        setSliderValue(filters.priceRange.max)
    }, [filters])

    return (
        <article className="flex gap-2">
            <section className="relative flex flex-col gap-2 flex-2">
                <label className="text-gray-800 text-sm">Ejendomstype</label>
                <button onClick={handleDropdownToggle} className="border-[1px] border-gray-300 text-gray-400 flex justify-between items-center p-2 rounded-sm w-72">
                    <span className="truncate">{selectedOption}</span>
                    <IoMdArrowDropdown size={25} className={`transition-transform duration-100 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 bg-gray-200 border-[1px] border-gray-300 rounded-sm shadow-lg p-3 flex flex-col gap-1 items-start w-full z-50">
                        {dropdownOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className="hover:text-blue-600"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </section>
            <section className="flex flex-col gap-2 flex-1">
                <label className="text-gray-800 text-sm">Pris-interval</label>
                <input
                    id="default-range"
                    type="range"
                    min={sliderProps.lowest}
                    max={sliderProps.highest}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="w-full h-1 cursor-pointer"
                />
                <div className="text-gray-400 text-sm flex justify-between items-center">
                    <p>{formatNumber(sliderProps.lowest)} kr.</p>
                    <p>{formatNumber(sliderValue)} kr.</p>
                </div>
            </section>
        </article>
    )
}
