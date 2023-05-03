import Icon from "@material-tailwind/react/Icon"
import { signOut, useSession } from "next-auth/client"
import Image from "next/dist/client/image"

const Header = () => {
    const [session] = useSession()

    return (
        <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
        <Icon name="description" size="5xl" color="blue" />
        <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
        <div
            className="mx-5 md:mx-20 flex flex-grow items-center
            px-5 py-2 bg-gray-100 text-gray-600 rounded-lg
            focus-within:text-gray-600 focus-within:shadow-md"
        >
            <Icon name="search" size="3xl" color="darkgray" />
            <input
                type="text"
                placeholder="Search"
                className="flex-grow px-5 text-base bg-transparent outline-none"
            />
        </div>
        <Icon name="apps" className="mr-2" size="3xl" color="gray" />
        <div className="mr-2 ml-1"></div>
        <Image
            src={session?.user?.image}
            className="cursor-pointer rounded-full"
            objectFit="contain"
            height="40"
            width="40"
            onClick={signOut}
        />
        </header>
    )
}

export default Header
