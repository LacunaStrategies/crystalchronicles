import AdminLayout from "@/layouts/AdminLayout"
import Image from "next/image"
import Link from "next/link"
import mysticBag from '@/public/assets/images/mystic-drawstring-bag.webp'
import mysticPlus from '@/public/assets/images/mystic-plus-icon.webp'
import { ICrystalCollection } from "@/types/CrystalCollection"
import { useState } from 'react'
import { X, XCircle } from 'lucide-react'
import { fakeInsert } from "@/lib/utils"
import { useEffect } from 'react'
import { toast } from "react-hot-toast"

export const Crystals = () => {

    // State Variables
    const [showModal, setShowModal] = useState('')
    const [newCollectionName, setNewCollectionName] = useState('')
    const [collectionToDelete, setCollectionToDelete] = useState<ICrystalCollection | null>(null)
    const [processing, setProcessing] = useState(false)
    const [crystalCollections, setCrystalCollections] = useState<ICrystalCollection[] | []>([])

    useEffect(() => {
        const getUserCrystalCollection = async () => {
            const resp = await fetch('/api/collections/getCollections', {
                method: 'GET'
            })
            const respJson = await resp.json()
            setCrystalCollections(respJson.data)
        }
        getUserCrystalCollection()
    }, [])

    const handleModalClose = () => {
        setNewCollectionName('')
        setCollectionToDelete(null)
        setShowModal('')
    }

    const handleAddNewCollection = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setProcessing(true)

        let json

        try {
            const resp = await fetch('/api/collections/createCollection', {
                method: 'POST',
                body: JSON.stringify({ newCollectionName })
            })
            json = await resp.json()
        } catch (error) {
            console.error(error)
        }

        if (!json.success) {
            toast.error(json.message)
        } else {
            const newCrystalCollections = [...crystalCollections]
            newCrystalCollections.push({
                _id: json.data.insertedId,
                name: newCollectionName,
                user_id: '',
            })
            setCrystalCollections(newCrystalCollections)
            toast.success('Your new collection has been created successfully!')
        }

        setProcessing(false)
        handleModalClose()
    }

    const handleDeleteCollection = async () => {
        setProcessing(true)

        let json

        try {
            const resp = await fetch('/api/collections/deleteCollection', {
                method: 'POST',
                body: JSON.stringify({ crystalCollectionId: collectionToDelete?._id })
            })
            json = await resp.json()
        } catch (error) {
            console.error(error)
        }

        if (!json.success || !json.data.acknowledged) {
            toast.error(`There was an error deleting the collection "${collectionToDelete?.name}". Please refresh the page and try again.`)
        } else {
            const newCrystalCollectionState = crystalCollections.filter(obj => obj._id !== collectionToDelete?._id)
            setCrystalCollections(newCrystalCollectionState)
            toast.success(`Collection "${collectionToDelete?.name}" was successfully deleted!`)
        }

        setProcessing(false)
        handleModalClose()
    }


    return (
        <AdminLayout pageName="My Collections">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => setShowModal('add')}
                    >
                        <Image src={mysticPlus} width={85} height={85} alt="Mystic Plus Symbol" className="mb-4 mx-auto" />
                        <div className="w-full text-center">Add New Collection</div>
                    </button>
                </div>
                <div>
                    <Link href={`/app/my-crystals`} className="block transition-all duration-300 scale-90 hover:scale-95">
                        <Image src={mysticBag} alt="Mystic Bag" width={500} height={480} priority />
                        <div className="uppercase text-xl text-center">All Crystals</div>
                    </Link>
                </div>
                {
                    crystalCollections.map(collection => (
                        <div
                            key={collection._id}
                            className="relative"
                        >
                            <Link href={`/app/my-collections/${collection._id}`} className="block transition-all duration-300 scale-90 hover:scale-95">
                                <Image src={mysticBag} alt="Mystic Bag" width={500} height={480} priority />
                                <div className="uppercase text-xl text-center">{collection.name}</div>
                            </Link>
                            <button
                                onClick={() => { setShowModal('delete'); setCollectionToDelete(collection) }}
                                className="absolute top-2 right-2 text-black"
                            >
                                <XCircle aria-hidden="true" aria-label={`Delete ${collection.name} collection`} />
                            </button>
                        </div>
                    ))
                }

                {
                    showModal === 'add' && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center">
                            <div onClick={() => handleModalClose()} className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"></div>
                            <div className="relative my-auto w-full max-w-3xl bg-white p-8 rounded-3xl shadow shadow-black">
                                <button
                                    onClick={() => handleModalClose()}
                                    className="absolute top-5 right-5"
                                >
                                    <X aria-hidden="true" aria-label="Close Modal" />
                                </button>

                                <div className="text-xl uppercase font-medium mb-4">Add New Collection</div>
                                <form onSubmit={handleAddNewCollection}>
                                    <div className="mb-4">
                                        <input
                                            className="py-2 px-3 border border-neutral-400 rounded-md w-full"
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={(e) => setNewCollectionName(e.target.value)}
                                            value={newCollectionName}
                                            placeholder="New collection name..."
                                            autoComplete="false"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <button
                                            disabled={processing}
                                            className="transition-all duration-300 py-1.5 px-5 rounded-md bg-fuchsia-800 text-white hover:bg-fuchsia-700 disabled:bg-fuchsia-700/30"
                                            type="submit"
                                        >
                                            {processing ? 'Please wait...' : 'Create Collection'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {
                    showModal === 'delete' && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center">
                            <div onClick={() => { handleModalClose() }} className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"></div>
                            <div className="relative my-auto w-full max-w-3xl bg-white p-8 rounded-3xl shadow shadow-black">
                                <button
                                    onClick={() => { handleModalClose() }}
                                    className="absolute top-5 right-5"
                                >
                                    <X aria-hidden="true" aria-label="Close Modal" />
                                </button>

                                <div className="text-center text-xl uppercase font-medium mb-2">Confirm Delete: <strong>{collectionToDelete?.name}</strong></div>
                                <p className="text-center mb-4">Deleting a collection can not be reversed! Please confirm your decision.</p>
                                <div className="flex justify-center items-center">
                                    <button
                                        disabled={processing}
                                        onClick={() => handleDeleteCollection()}
                                        className="inline-block transition duration-300 py-1.5 px-5 rounded-md bg-fuchsia-950 hover:bg-fuchsia-700 disabled:bg-fuchsia-700/30 text-white mr-2"
                                    >
                                        {processing ? 'Please wait...' : 'Confirm Delete'}
                                    </button>
                                    <button
                                        disabled={processing}
                                        onClick={() => handleModalClose()}
                                        className="inline-block transition duration-300 py-1.5 px-5 rounded-md bg-neutral-300 hover:bg-neutral-400 disabled:bg-neutral-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </AdminLayout>
    )
}

export default Crystals