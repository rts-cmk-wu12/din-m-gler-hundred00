import Link from "next/link";
import { FaPaperPlane, FaUser } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";

export default function Header() {
    return (
        <header>
            <article className="bg-commonBlue text-white flex items-center justify-between py-3 px-80 text-sm">
                <section className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <FaPaperPlane color="white" size={20} />
                        <a href="mailto:4000@dinmaegler.com">4000@dinmaegler.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdLocalPhone color="white" size={25} />
                        <p>+45 7070 4000</p>
                    </div>
                </section>
                <section className="flex items-center gap-2">
                    <FaUser color="white" size={15} />
                    <button>Log ind</button>
                </section>
            </article>
            <article className="bg-white flex items-center justify-between py-3 px-80 text-md">
                <Link href={"/"}>
                    <section className="text-commonBlue font-bold flex items-baseline text-4xl gap-2">
                        <img src="/images/logo.svg" alt="Din Mægler logo af to huse" />
                        <h2 className="uppercase">Din Mægler</h2>
                    </section>
                </Link>
                <nav className="text-[#333333] flex gap-8">
                    <a href="/search">Boliger til salg</a>
                    <a href="">Mæglere</a>
                    <a href="">Mine favoritter</a>
                    <a href="">Kontakt os</a>
                </nav>
            </article>
        </header>
    )
}