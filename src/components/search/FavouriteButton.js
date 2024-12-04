import { FaRegHeart } from "react-icons/fa";

export default function FavouriteButton({type, homeId}) {
    if (type === "search") {
        return (
            <button className="absolute bg-white rounded-full p-2 flex items-center justify-center ml-[22rem] mt-2 hover:bg-red-500 duration-150"><FaRegHeart className="fill-black hover:fill-white duration-150 w-full h-full" /></button>
        )
    }
    if (type === "favourites") {
        return (
            <button className="text-white bg-commonBlue p-4 rounded-base font-semibold">Fjern fra favotitter</button>
        )
    }
}