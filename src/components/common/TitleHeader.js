export default function TitleHeader({ title }) {
    return (
        <article className="flex justify-center items-center relative w-full py-16 px-80">
            <div className="bg-title-header-image bg-cover w-full h-full absolute opacity-10 z-20" />
            <div className="bg-commonBlue w-full h-full absolute z-10" />
            <section className="flex gap-5 z-30 items-center justify-center">
                <h1 className="text-white text-5xl font-bold">{title}</h1>
            </section>
        </article>
    )
}