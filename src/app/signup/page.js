import TitleHeader from "@/components/common/TitleHeader"

import Link from "next/link"

export default function LoginPage() {
    return (
        <main>
            <TitleHeader title="Account Register" />
            <article className="flex items-center justify-center py-24 px-[35rem]">
                <section className="bg-white py-14 px-36 border-gray-200 border-[1px] rounded-sm shadow-sm flex items-center justify-center flex-col gap-10 w-full">
                    <h2 className="text-center text-2xl text-commonBlue font-semibold">Opret bruger hos Din Mægler</h2>
                    <form onSubmit={console.log("Singing up")} className="w-full flex flex-col gap-5">
                        <section className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-md text-gray-600">Fulde navn</label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                className="border-gray-200 border-[1px] rounded-sm text-gray-600 p-3 w-full"
                                placeholder="Fulde navn"
                            />
                        </section>
                        <section className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-md text-gray-600">Email adresse</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="border-gray-200 border-[1px] rounded-sm text-gray-600 p-3 w-full"
                                placeholder="Email adresse"
                            />
                        </section>
                        <section className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-md text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border-gray-200 border-[1px] rounded-sm text-gray-600 p-3 w-full"
                                placeholder="Password"
                            />
                        </section>
                        <section className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-md text-gray-600">Bekræft password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border-gray-200 border-[1px] rounded-sm text-gray-600 p-3 w-full"
                                placeholder="Bekræft password"
                            />
                        </section>
                        <button
                            type="submit"
                            className="p-3 bg-commonBlue text-white text-center w-full font-semibold rounded-sm">
                            Opret bruger
                        </button>
                    </form>
                </section>
            </article>
        </main>
    )
}
