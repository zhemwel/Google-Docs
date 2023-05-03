import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import Image from "next/image"
import Header from "../components/Header"
import { useSession, getSession } from "next-auth/client"
import Login from "../components/Login"
import Modal from "@material-tailwind/react/Modal"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import firebase from "firebase/app"
import DocumentRow from "../components/DocumentRow"
import { Helmet } from "react-helmet"

export default function Home() {
    const [session] = useSession()

    if (!session) {
        return <Login />
    }

    // State Untuk Menyimpan Data Snapshot Dari Firestore
    const [snapshot, setSnapshot] = useState([])

    // State Untuk Melakukan Rerender Setelah Mengubah Data Snapshot
    const [rerender, setRerender] = useState(false)

    const [loader, setLoader] = useState(false)
    const [showModal, setShowmodal] = useState(false)
    const [input, setInput] = useState("")

    useEffect(() => {
        // Menggunakan React Hooks useCollectionOnce Untuk Mengambil Data Snapshot Dari Firestore
        const unsubscribe = db
            .collection("userDocs")
            .doc(session.user.email)
            .collection("docs")
            .orderBy("timeStamp", "desc")
            .onSnapshot((snapshot) => {
                setSnapshot(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        fileName: doc.data().fileName,
                        timeStamp: doc.data().timeStamp,
                    }))
                )
            })

        return unsubscribe
    }, [session.user.email])

    const createDocument = () => {
        if (!input) {
            return
        }

        setLoader(true)

        db.collection("userDocs")
            .doc(session.user.email)
            .collection("docs")
            .add({
                fileName: input,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                // Mengubah State Rerender Menjadi True Untuk Melakukan Rerender Komponen
                setRerender(true)
                setLoader(false)
                setInput("")
                setShowmodal(false)
            })
            .catch((error) => {
                console.error("Error Adding Document: ", error)
            })
    }

    useEffect(() => {
        // Menggunakan React Hooks useEffect Untuk Melakukan Rerender Setelah Mengubah Data Snapshot
        if (rerender) {
            setRerender(false)
        }
    }, [rerender])

    const modal = (
        <Modal
            size="sm"
            active={showModal}
            toggler={() => {
                setShowmodal(false)
            }}
        >
            {
                loader
                    ? <div className="classic-4"></div>
                    : <ModalBody>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="outline-none w-full mb-7 mt-6"
                            placeholder="Enter the Name of Document"
                            onKeyDown={(e) => e.key === "Enter" && createDocument()}
                        />
                        <ModalFooter>
                            <Button
                                color="blue"
                                buttonType="link"
                                onClick={(e) => {setShowmodal(false); setInput("")}}
                                ripple="dark"
                            >
                                Cancel
                            </Button>
                            <Button color="blue" onClick={createDocument} ripple="light">
                                Create
                            </Button>
                        </ModalFooter>
                    </ModalBody>
            }
        </Modal>
    )

    return (
        <div>
            <Helmet>
                <title>Google Docs Clone</title>
            </Helmet>
            <Header />

            {modal}

            <section className="bg-[#F89F9FA] pb-10 px-10">
                <div className="max-w-3xl mx-auto ">
                    <div className="flex items-center justify-between py-6">
                        <h2 className="text-gray-600 text-lg">Start A New Document</h2>
                        <Button
                            className="border-0"
                            color="gray"
                            buttonType="outline"
                            iconOnly={true}
                            ripple="dark"
                        >
                            <Icon name="more_vert" size="3xl" />
                        </Button>
                    </div>
                    <div>
                        <div
                            className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
                            onClick={() => setShowmodal(true)}
                        >
                            <Image src="https://links.papareact.com/pju/" layout="fill" />
                        </div>
                        <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
                            Blank
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white px-10">
                <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
                    <div className="flex items-center justify-between pb-5">
                        <h2 className="font-medium flex-grow">My Documents</h2>
                        <p className="mr-12">Date Created</p>
                        <Icon name="folder" size="3xl" color="gray" />
                    </div>
                    {/* Menggunakan State Snapshot Untuk Merender Komponen DocumentRow */}
                    {
                        snapshot.map((doc) => (
                            <DocumentRow
                                key={doc.id}
                                id={doc.id}
                                fileName={doc.fileName}
                                date={doc.timeStamp}
                            />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session,
        },
    }
}
