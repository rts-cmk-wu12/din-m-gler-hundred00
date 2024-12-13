import { FaPaperPlane } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
    return (
        // i didnt use grid. arghhh ohh the humanity
        <footer className="bg-gray-100 px-96 pt-20 mb-44">
            <div>
                <section className="flex flex-col gap-5">
                    <section className="text-commonBlue font-bold flex items-baseline text-4xl gap-2">
                        <img src="/images/logo.svg" alt="Din Mægler logo af to huse" />
                        <h2 className="uppercase">Din Mægler</h2>
                    </section>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
                </section>
                <section className="flex gap-32 relative top-24">
                    <div className="flex flex-col gap-8 bg-white p-10 rounded-sm shadow-md flex-1">
                        <div className="flex gap-3">
                            <div className="bg-commonBlue rounded-full aspect-square flex items-center justify-center"><MdLocalPhone color="white" size={30}/></div>
                            <div className="flex flex-col gap-1 justify-center">
                                <p className="text-gray-500 text-sm">Ring til os</p>
                                <p className="text-gray-800 font-semibold text-lg">+45 7070 4000</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-commonBlue rounded-full aspect-square flex items-center justify-center"><FaPaperPlane color="white" size={20}/></div>
                            <div className="flex flex-col gap-1 justify-center">
                                <p className="text-gray-500 text-sm">Send en email</p>
                                <p className="text-gray-800 font-semibold text-lg">4000@dinmaegler.com</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-commonBlue rounded-full aspect-square flex items-center justify-center"><FaMapMarkerAlt color="white" size={20}/></div>
                            <div className="flex flex-col gap-1 justify-center">
                                <p className="text-gray-500 text-sm">Butik</p>
                                <p className="text-gray-800 font-semibold text-lg">Stændertorvet 78, 4000</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-800">Din Mægler Roskilde, er din boligibutik i lokalområdet.</p>
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                        <div className="text-gray-700 text-lg flex flex-col gap-3">
                            <h6 className="text-gray-800 text-2xl font-semibold pb-3">Quick Links</h6>
                            <Link href="/search">Boliger til salg</Link>
                            <Link href="/">Mæglere</Link>
                            <Link href="/">Kontakt os</Link>
                            <Link href="/login">Log ind / bliv bruger</Link>
                        </div>
                        <div className="text-gray-500">
                            <p className="text-sm">Medlem af<br/><span className="font-bold text-3xl">DMS</span><br/><span className="text-base">Dansk Mægler Sammenslutning</span></p>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    )
}