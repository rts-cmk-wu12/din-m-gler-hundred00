import { FaPaperPlane } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { FaLinkedinIn, FaInstagram, FaSkype } from "react-icons/fa";

export default function AgentCard({data = {}}) {
    const agentName = data?.name || "Lars Larsen"
    const agentTitle = data?.title || "Ejendomsmælger"
    const phoneNumber = data?.phone || "+45 99 99 99 99"
    const emailAddress = data?.email || "lars@dinmaegler.com"

    const agentImage = data?.image?.url || "/images/placeholder.jpg"

    return (
        <article className="p-8 border-[1px] border-gray-300 flex gap-5 overflow-hidden">
            <div>
                <img src={agentImage} alt="Headshot of agent" className="object-cover aspect-square w-full h-full min-h-56 min-w-56" />
                <div className="flex gap-5 bg-commonBlue p-3 absolute top-60">
                    <FaInstagram color="white"/>
                    <FaLinkedinIn color="white"/>
                    <FaSkype color="white"/>
                </div>
            </div>
            <div className="flex flex-col gap-2 min-w-80">
                <p className="text-xl font-semibold">{agentName}</p>
                <p className="text-base text-gray-400 font-semibold">{agentTitle}</p>
                <hr className="my-2"/>
                <div className="flex flex-col gap-2 text-gray-800">
                    <p className="flex gap-3 items-center"><MdLocalPhone size={22}/>{phoneNumber}</p>
                    <p className="flex gap-3 items-center"><FaPaperPlane/>{emailAddress}</p>
                </div>
            </div>
        </article>
    )
}