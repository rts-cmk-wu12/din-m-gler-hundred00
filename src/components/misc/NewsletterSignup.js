import { FaArrowRightLong } from "react-icons/fa6";

export default function NewsletterSignup() {
    return (
        <article className="flex justify-center items-center relative w-full py-20 px-96">
            <div className="bg-newsletter-image bg-fit w-full h-full absolute opacity-10 z-20" />
            <div className="bg-slate-700 w-full h-full absolute z-10" />
            <section className="flex gap-5 z-30 items-center justify-center">
                <h5 className="text-2xl font-semibold text-white">Tilmeld dig vores nyhedsbrev og hold dig opdateret på boligmarkedet</h5>
                <div className="relative w-full max-w-sm">
                    <input
                        type="email"
                        placeholder="Indtast din email adresse"
                        className="w-full pl-4 pr-20 py-4 text-sm border border-gray-400 rounded-sm" />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center justify-center">
                        <FaArrowRightLong size={22} />
                    </button>
                </div>
            </section>
        </article>
    )
}