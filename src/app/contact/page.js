import { FaPaperPlane } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";

import TitleHeader from "@/components/common/TitleHeader";
import MessageForm from "@/components/misc/MessageForm";

export default function contactPage() {
    return (
        <main>
            <TitleHeader title="Kontakt os" />
            <article className="px-96 flex flex-col gap-5 py-20 items-center">
                <section className="px-32">
                    <h2 className="mb-6 text-2xl font-semibold text-gray-900">Vi sidder klar til at besvare dine spørgsmål</h2>
                    <div className="h-[3px] w-[30%] bg-commonBlue my-2 mb-5" />
                    <p className="text-sm mb-10">Der kan opstå tvivl om mange ting nå man gerne vil, eller er i gang med at sælge sin bolig. Vores medarbejdere sider klar alle ugens dage til at svare på dine spørgsmål.</p>
                </section>
                <section className="flex gap-7">
                    <form className="w-full max-w-lg p-6 rounded-sm border-[1px] border-gray-300 shadow-sm">
                        <MessageForm/>
                    </form>
                    <div className="p-6 rounded-sm border-[1px] border-gray-300 shadow-sm flex flex-col gap-8">
                        <section className="flex flex-col gap-2 items-center">
                            <div className="bg-commonBlue rounded-full aspect-square flex items-center justify-center p-2"><MdLocalPhone color="white" size={25} /></div>
                            <p className="text-gray-500 text-sm">Ring til os</p>
                            <p className="text-gray-800 font-semibold text-sm">+45 7070 4000</p>
                        </section>
                        <div className="h-[2px] w-full bg-gray-300" />
                        <section className="flex flex-col gap-2 items-center">
                            <div className="bg-commonBlue rounded-full aspect-square flex items-center justify-center p-3"><FaPaperPlane color="white" size={15} /></div>
                            <p className="text-gray-500 text-sm">Send en email</p>
                            <p className="text-gray-800 font-semibold text-sm">4000@dinmaegler.com</p>
                        </section>
                        <div className="h-[2px] w-full bg-gray-300" />
                        <section className="flex flex-col gap-2 items-center">
                            <div className="bg-commonBlue rounded-full aspect-square flex items-center justify-center p-3"><FaMapMarkerAlt color="white" size={15} /></div>
                            <p className="text-gray-500 text-sm">Besøg butikken</p>
                            <p className="text-gray-800 font-semibold text-sm">Stændertorvet 78, 4000 Roskilde</p>
                        </section>
                    </div>
                </section>
            </article>
            <img src="/images/contact/map-background.jpg" className="mt-10"/>
        </main>
    )
}