import { ICheckbox, ICrystalCollection } from '@/types/CrystalCollection'
import { X } from 'lucide-react'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import Checkbox from '../ui/checkbox'
import { ICrystal, IUserCrystal } from '@/types/Crystal'
import Link from 'next/link'

interface Props {
    crystalData: ICrystal
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const ModalAddToCollection: React.FC<Props> = ({ crystalData, setShowModal }) => {

    const [collections, setCollections] = useState<ICrystalCollection[] | []>([])
    const [checkboxes, setCheckboxes] = useState<ICheckbox[] | []>([])
    const [changesExist, setChangesExist] = useState(false)

    const [processing, setProcessing] = useState(false)
    const [loading, setLoading] = useState(true)

    // Load Current Available Collections
    useEffect(() => {
        const getCollections = async () => {
            let json

            // TODO: Refactor to remove multiple endpoints
            try {
                const resp = await fetch('/api/collections/getCollections')
                json = await resp.json()
            } catch (error) {
                console.error(error)
            }

            if (json.success) {
                const data: ICrystalCollection[] | [] = json.data
                setCollections(data)
            } else {
                toast.error('An unexpected error occured.')
            }
        }
        getCollections()

        setLoading(false)

    }, [])

    useEffect(() => {
        setCheckboxes(
            collections.map(
                collection => collection.user_crystal_ids.includes(crystalData._id) ?
                    { collectionId: collection._id, name: collection.name, isChecked: true } :
                    { collectionId: collection._id, name: collection.name, isChecked: false }
            )
        )
    }, [collections])

    const handleCheck = (collectionId: string) => {
        setChangesExist(true)
        setCheckboxes(
            checkboxes.map(
                checkbox => checkbox.collectionId === collectionId ?
                    { ...checkbox, isChecked: !checkbox.isChecked } :
                    checkbox
            )
        )
    }

    const handleAddToCollection = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setProcessing(true)

        let json
        try {
            const resp = await fetch('/api/crystals/addToCollection', {
                method: 'POST',
                body: JSON.stringify({ crystalData, checkboxes })
            })
            json = await resp.json()
        } catch (error) {
            console.error(error)
        }

        if (json.success) {
            toast.success('Your collections have been updated!')
        } else {
            toast.error('An unexpected error occurred!')
        }

        setProcessing(false)
        setShowModal(false)

    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center">
            <div onClick={() => setShowModal(false)} className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"></div>
            <div className="relative my-auto w-full max-w-3xl bg-white p-8 rounded-3xl shadow shadow-black">
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-5 right-5"
                >
                    <X aria-hidden="true" aria-label="Close Modal" />
                </button>

                <div className="text-center text-xl uppercase font-medium mb-2">Add To Collection</div>
                <p className="text-center mb-4">Select the collection(s) to add this crystal to.</p>
                {
                    loading ?
                        'Loading...' :
                        checkboxes.length > 0 ?
                            (
                                <form onSubmit={handleAddToCollection}>
                                    <div className="mb-4 flex flex-col items-center justify-center">
                                        {
                                            checkboxes.map(
                                                (checkbox, i) => (
                                                    <Checkbox
                                                        key={checkbox.collectionId}
                                                        isChecked={checkbox.isChecked}
                                                        checkHandler={() => handleCheck(checkbox.collectionId)}
                                                        label={checkbox.name}
                                                        index={i}
                                                    />
                                                )
                                            )
                                        }
                                    </div>
                                    <div className="text-center">
                                        <button
                                            disabled={processing || loading || !changesExist}
                                            className="inline-block transition-all duration-300 py-1.5 px-5 rounded-md bg-fuchsia-800 text-white hover:bg-fuchsia-700 disabled:bg-fuchsia-700/30"
                                            type="submit"
                                        >
                                            {processing ? 'Please wait...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <p className="text-lg mb-2">No Collections Found...</p>
                                    <Link
                                        href="/app/my-collections"
                                        className="transition duration-300 text-fuchsia-800 hover:text-fuchsia-500"
                                    >
                                        Create one now!
                                    </Link>
                                </div>
                            )
                }
            </div>
        </div>
    )
}