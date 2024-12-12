import Link from "next/link";

import { formatNumber } from "@/utils/formatNumber";
import FavouriteButton from "./FavouriteButton";

const energyLabelColors = { // i tried to use tailwind for this by adding these in the config but the color would not update dynamically even when the style was changed. as this is the only components these are used on however it should be fine to just have them here unless i find a better way
    A: "#10AC84",
    B: "#F2C94C",
    C: "#F2994A",
    D: "#EB5757",
}

export default function ResultFrame({ type, includeFavourite, data = {}, userFavorites, setUserFavorites }) {
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

    const propertyId = data?.id || "0"
    const propertyUrl = data?.id ? `/property/${propertyId}` : "/search"

    if (type === "search") {
        return (
            <article className="bg-white rounded-lg shadow-sm hover:scale-[1.01] duration-200">
                {includeFavourite && ( // favourite button does not show up on the home page but it does show up on the search page or what i am calling the search page
                    <FavouriteButton type={"search"} homeId={propertyId} userFavorites={userFavorites} setUserFavorites={setUserFavorites} />
                )}
                <Link href={propertyUrl}>
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
    if (type === "favourites") {
        return (
            <article className="bg-white rounded-sm border-[1px] border-gray-200 shadow-sm hover:scale-[1.01] duration-200 w-full p-8">
                <Link href={propertyUrl}>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="w-full min-h-28 bg-cover bg-center rounded-t-sm"
                            style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
                        <section>
                            <div className="flex flex-col gap-2">
                                <p className="text-base font-semibold">{address}</p>
                                <p>{city} {postalCode}</p>
                                <p className="font-semibold text-lg">{houseType} •
                                    <span className="text-sm"> Ejerudgift: {formatNumber(ownershipExspanse)} kr.</span>
                                </p>
                            </div>
                        </section>
                        <section>
                            <div className="flex gap-5 items-center">
                                <div className={"p-2 aspect-square max-w-7 max-h-7 flex justify-center items-center text-start"} style={{ backgroundColor: energyLabelClass }}>
                                    <p className="text-white font-semibold leading-none text-lg">{energyLabel}</p>
                                </div>
                                <p>{rooms} værelser • {plotSize} m²</p>
                            </div>
                        </section>
                        <section className="flex flex-col justify-between">
                            <p className="font-semibold text-lg text-end">Kr. {formatNumber(price)}</p>
                            <FavouriteButton type={"favourites"} homeId={propertyId} />
                        </section>
                    </div>
                </Link>
            </article>
        )
    }
}