import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";

export default function EmployeeCard({ data = {} }) {
    const agentName = data?.name || "Lars Larsen"
    const agentTitle = data?.title || "Ejendomsmælger"

    const agentImage = data?.image?.url || "/images/placeholder.jpg"

    return (
        <article className="rounded-md shadow-lg border-[1px] border-gray-300">
            <section className=" flex flex-col justify-center items-center">
                <img src={agentImage} alt="Headshot of agent" className="object-cover aspect-square w-full h-full rounded-t-md" />
            </section>
            <section className="flex flex-col gap-2 items-center justify-center py-5 text-center">
                <p className="text-xl font-semibold">{agentName}</p>
                <p className="text-md text-gray-400 font-semibold">{agentTitle}</p>
                <div className="flex gap-2">
                    <button><MdEmail /></button>
                    <button><FaLinkedinIn /></button>
                </div>
            </section>
        </article>
    )
}