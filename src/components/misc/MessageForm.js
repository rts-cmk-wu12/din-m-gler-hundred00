export default function MessageForm() {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-semibold text-zinc-800">
                        Navn
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-sm"
                        placeholder="Indtast navn"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-semibold text-zinc-800">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-sm"
                        placeholder="Indtast email"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-zinc-800">
                    Emne
                </label>
                <input
                    type="text"
                    id="topic"
                    name="topic"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-sm"
                    placeholder="Hvad drejer din henvendelse sig om?"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-zinc-800">
                    Besked
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-sm"
                    placeholder="Skriv din besked her..."
                />
            </div>
            <button
                type="submit"
                className="text-sm text-white bg-commonBlue px-5 py-3 rounded-sm"
            >
                Send besked
            </button>
        </div>
    )
}