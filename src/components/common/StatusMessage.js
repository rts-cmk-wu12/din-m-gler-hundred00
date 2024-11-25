import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdError } from "react-icons/md"

export default function StatusMessage({ messageText, messageIcon }) {
    const icon =
        messageIcon === "loading" ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={30} color="white" />
        ) : (
            <MdError size={30} color="white" />
        )

    return (
        <article className="p-10 flex gap-5 text-2xl items-center justify-center mx-80 my-20 text-white bg-gray-400 rounded-sm shadow-lg">
            <h2>{messageText}</h2>
            {icon}
        </article>
    )
}
