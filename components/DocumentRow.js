import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { useRouter } from "next/dist/client/router"

const DocumentRow = ({ id, fileName, date }) => {
    const router = useRouter()

    return (
        <div
            onClick={() => router.push(`docs/${id}`)}
            className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-sm cursor-pointer"
        >
        <Icon name="article" size="3xl" color="blue" />
        <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
        <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>

        <Button
            className="border-0"
            color="gray"
            buttonType="outline"
            iconOnly={true}
            rounded={true}
            ripple="dark"
        >
            <Icon name="more_vert" size="3xl" />
        </Button>
        </div>
    )
}

export default DocumentRow
