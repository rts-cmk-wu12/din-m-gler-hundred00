import StatusMessage from "@/components/common/StatusMessage"
import TitleHeader from "@/components/common/TitleHeader";
import ResultFrame from "@/components/search/Result";
import Link from "next/link"

import { IoSearch } from "react-icons/io5";

export default function FaouritesPage() {
    return (
        <main>
            <TitleHeader title={"Mine favoritboliger"} />
            <article className="flex items-center justify-center flex-col py-24 px-[30rem] gap-6">
                <section className="w-full grid grid-cols-1 place-items-start">
                    <form onSubmit={null} className="flex items-center gap-2 p-2 border-[1px] border-gray-200 shadow-sm rounded-sm">
                        <IoSearch className="fill-gray-400" size={20}/>
                        <input
                            type="text"
                            value={null}
                            onChange={null}
                            placeholder="Søg i favoritter"
                            className="min-w-20 text-gray-400"/>
                    </form>
                </section>
                <hr className="border-0 w-full bg-gray-200 h-[1px] mb-6"/>
                <section className="w-full">
                    <ResultFrame type={"favourites"} includeFavourite={true} data={null}/>
                </section>
            </article>
        </main>
    )
}
