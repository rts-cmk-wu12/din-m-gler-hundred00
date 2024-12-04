"use client"

import { useEffect, useState } from "react";

import { HiOutlinePhoto } from "react-icons/hi2";
import { IoLayersOutline } from "react-icons/io5";
import { FiMapPin, FiHeart } from "react-icons/fi";

import AgentCard from "@/components/misc/AgentCard";
import StatusMessage from "@/components/common/StatusMessage";

import { formatNumber } from "@/utils/formatNumber";

export default function PropertyPage({ params }) {
    const [homeId, setHomeId] = useState(null)
    const [home, setHome] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function unwrapParams() {
            const { homeId: resolvedHomeId } = await params
            setHomeId(resolvedHomeId)
        }
        unwrapParams()
    }, [params])

    useEffect(() => {
        if (!homeId) return

        async function fetchHome() {
            try {
                const response = await fetch(`/api/homes/${homeId}`)
                if (!response.ok) {
                    console.error("failed to fetch home")
                    return
                }

                const data = await response.json()
                setHome(data)
            } catch (error) {
                console.error("Error fetching home:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchHome()
    }, [homeId])

    if (isLoading) {
        return <StatusMessage messageText = "Indlæser bolig detaljer..." messageIcon = "loading" />
    }

    if (!home) {
        return <StatusMessage messageText = "Kunne ikke finde bolig nummer..." messageIcon = "error" />
    }

    return (
        <main>
            <article className="relative py-80 px-[30rem]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${home.images?.[0]?.url || '/images/placeholder.jpg'})` }}
                ></div>
            </article>
            <article className="px-80 pb-60 flex flex-col gap-7">
                <section className="flex flex-col py-10">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">{home.adress1 || "Unknown Address"}</h2>
                        <div className="flex gap-10">
                            <button>
                                <HiOutlinePhoto color="#7B7B7B" size={50} />
                            </button>
                            <button>
                                <IoLayersOutline color="#7B7B7B" size={50} />
                            </button>
                            <button>
                                <FiMapPin color="#7B7B7B" size={50} />
                            </button>
                            <button>
                                <FiHeart color="#7B7B7B" size={50} />
                            </button>
                        </div>
                        <h3 className="text-2xl font-semibold">
                            Kr. {formatNumber(home.price || 0)}
                        </h3>
                    </div>
                    <hr className="my-10" />
                    <div className="flex justify-between gap-16">
                        <ul className="w-full">
                            <li className="flex justify-between">
                                <span>Sagsnummer:</span>
                                <span>{home.id || "N/A"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Boligareal:</span>
                                <span>{home.livingspace || "N/A"} m²</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Grundareal:</span>
                                <span>{home.lotsize || "N/A"} m²</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Rum/værelser:</span>
                                <span>{home.rooms || "N/A"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Antal Plan:</span>
                                <span>{home.type || "N/A"}</span>
                            </li>
                        </ul>
                        <ul className="w-full">
                            <li className="flex justify-between">
                                <span>Kælder:</span>
                                <span>{home.basementsize ? "Ja" : "Nej"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Byggeår:</span>
                                <span>{home.built || "N/A"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Ombygget:</span>
                                <span>{home.remodel || "N/A"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Energimærke:</span>
                                <span>{home.energylabel || "N/A"}</span>
                            </li>
                        </ul>
                        <ul className="w-full">
                            <li className="flex justify-between">
                                <span>Udbetaing:</span>
                                <span>Kr. {formatNumber(home.payment || 0)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Brutto ex ejerudgift:</span>
                                <span>Kr. {formatNumber(home.gross || 0)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Netto ex ejerudgift:</span>
                                <span>Kr. {formatNumber(home.netto || 0)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Ejerudgifter:</span>
                                <span>Kr. {formatNumber(home.cost || 0)}</span>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="flex gap-14">
                    <div className="flex-1 flex flex-col gap-5">
                        <p className="text-xl font-semibold">Beskrivelse</p>
                        <p>{home.description || "Ingen beskrivelse tilgængelig."}</p>
                    </div>
                    <div className="flex-1 -mx-20 relative left-16 flex flex-col gap-5">
                        <p className="text-xl font-semibold">Ansvarlig mægler</p>
                        <AgentCard data={home.agent} />
                    </div>
                </section>

            </article>
        </main>
    )
}
