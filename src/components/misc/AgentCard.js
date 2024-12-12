import { FaPaperPlane } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { FaLinkedinIn, FaInstagram, FaSkype } from "react-icons/fa";
import Link from "next/link";
import MessageForm from "./MessageForm";

export default function AgentCard({ data = {}, extraInformation }) {
    const agentName = data?.name || "Lars Larsen"
    const agentTitle = data?.title || "Ejendomsmælger"
    const phoneNumber = data?.phone || "+45 99 99 99 99"
    const emailAddress = data?.email || "lars@dinmaegler.com"

    const agentImage = data?.image?.url || "/images/placeholder.jpg"
    const description = data?.description || "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."

    const agentId = data?.id || "0"
    const agentUrl = data?.id ? `/agent/${agentId}` : "/search"

    return (
        <article className="p-8 border-[1px] border-gray-300 overflow-hidden flex flex-col">
            <section className="flex gap-5">
                <div>
                    <img src={agentImage} alt="Headshot of agent" className="object-cover aspect-square w-full h-full min-h-56 min-w-56" />
                    <div className="flex gap-5 bg-commonBlue p-3 absolute top-60">
                        <FaInstagram color="white" />
                        <FaLinkedinIn color="white" />
                        <FaSkype color="white" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 min-w-80">
                    <p className="text-xl font-semibold">{agentName}</p>
                    <p className="text-base text-gray-400 font-semibold">{agentTitle}</p>
                    <hr className="my-2" />
                    {extraInformation ? (
                        <div className="flex flex-col gap-2 text-gray-800">
                            <p className="flex gap-3 items-center"><MdLocalPhone size={22} />{phoneNumber}</p>
                            <p className="flex gap-3 items-center"><FaPaperPlane />{emailAddress}</p>
                        </div>
                    ) : (
                        <Link href={agentUrl}>
                            <div className="flex flex-col gap-2 text-gray-800">
                                <p className="flex gap-3 items-center"><MdLocalPhone size={22} />{phoneNumber}</p>
                                <p className="flex gap-3 items-center"><FaPaperPlane />{emailAddress}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </section>
            {extraInformation && (
                <section className="flex flex-col gap-7">
                    <div>
                        <h3 className="font-semibold text-lg">Om {agentName}</h3>
                        <div className="h-[3px] w-[10%] bg-black my-4" />
                        <p className="text-zinc-800 text-sm">{description}</p>
                    </div>
                    <form className="w-full max-w-lg p-6 rounded-sm border-[1px] border-gray-300 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">Kontakt {agentName}</h2>
                        <div className="h-[3px] w-[30%] bg-commonBlue my-2" />
                        <MessageForm/>
                    </form>
                </section>
            )}
        </article>
    )
}