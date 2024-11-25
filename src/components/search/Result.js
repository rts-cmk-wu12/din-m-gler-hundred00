import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";

import { formatNumber } from "@/utils/formatNumber";

const energyLabelColors = {
    A: "#10AC84",
    B: "#F2C94C",
    C: "#F2994A",
    D: "#EB5757",
}

export default function ResultFrame({ includeFavourite, data = {} }) {
    const address = data?.adress1 || "Klosterengen 234"
    const city = data?.city || "Roskilde"
    const postalCode = data?.postalcode || "4000"
    const houseType = data?.type || "Villa"

    const plotSize = data?.lotsize || "999"
    const rooms = data?.rooms || "9"
    const energyLabel = data?.energylabel || "A"
    const energyLabelClass = energyLabelColors[energyLabel]

    const ownershipExspanse = data?.cost || "9999"
    const price = data?.price || "9999999"

    const backgroundImageUrl = data?.images?.[0]?.url || "/images/placeholder.jpg"

    const propertyId = data?.id ? `/property/${data.id}` : "/search"

    return (
        <article className="bg-white rounded-lg shadow-sm hover:scale-[1.01] duration-200">
            {includeFavourite && (
                <button className="absolute bg-white rounded-full p-2 flex items-center justify-center ml-[22rem] mt-2 hover:bg-red-500 duration-150"><FaRegHeart className="fill-black hover:fill-white duration-150 w-full h-full" /></button>
            )}
            <Link href={propertyId}>
                <div className="w-full min-h-40 bg-cover bg-center rounded-t-sm"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
                <section className="flex flex-col gap-2 text-sm p-5">
                    <p className="text-base font-semibold">{address} • {city}</p>
                    <p>{city} {postalCode}</p>
                    <p className="font-semibold text-lg">{houseType} •
                        <span className="text-sm"> Ejerudgift: {formatNumber(ownershipExspanse)} kr.</span>
                    </p>
                    <hr className="my-1" />
                    <div className="flex justify-between items-center gap-20">
                        <div className="flex gap-5 items-center">
                            <div className={"p-2 aspect-square max-w-7 max-h-7 flex justify-center items-center text-start"} style={{ backgroundColor: energyLabelClass }}>
                                <p className="text-white font-semibold leading-none text-lg">{energyLabel}</p>
                            </div>
                            <p>{rooms} værelser • {plotSize} m²</p>
                        </div>
                        <p className="font-semibold text-lg">Kr. {formatNumber(price)}</p>
                    </div>
                </section>
            </Link>
        </article>

    )
}