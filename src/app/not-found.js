export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 gap-10">
            <article className="flex flex-col items-center">
                <p className="text-white stroke-gray-600 text-stroke-3 font-bold text-[12rem] absolute">Hov!</p>
                <div className="bg-commonBlue px-56 py-12 mt-40"></div>
            </article>
            <article className="flex items-center flex-col text-center">
                <h1 className="text-3xl font-bold mb-4">Du er havnet på en side som ikke findes! </h1>
                <p className="text-xl mb-8 px-[35rem]">Det er vi kede af! Vi har sendt en besked af sted til vores internetbureau, og bedt dem se på fejlen.</p>
                <a href="/" className="py-4 px-7 bg-commonBlue text-white rounded-sm font-semibold">
                    Tilbage til forsiden
                </a>
            </article>
        </main>
    );
}
