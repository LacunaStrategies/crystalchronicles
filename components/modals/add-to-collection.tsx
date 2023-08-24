import { ICrystalCollection } from '@/types/CrystalCollection'
import { X } from 'lucide-react'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import Checkbox from '../ui/checkbox'
import { Crystal } from '@/types/Crystal'

interface ICollectionCheckbox extends ICrystalCollection {
    checked: boolean
}

interface Props {
    crystalData: Crystal
    setShowModal: Dispatch<SetStateAction<boolean>>
}
export const ModalAddToCollection: React.FC<Props> = ({ crystalData, setShowModal }) => {

    const [collectionsCheckboxes, setCollectionsCheckboxes] = useState<ICollectionCheckbox[] | []>([])
    const [processing, setProcessing] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCollections = async () => {
            let json
            try {
                const resp = await fetch('/api/collections/getCollections', { method: 'GET' })
                json = await resp.json()
            } catch (error) {
                console.error(error)
            }
            if (json.success) {
                const crystalCollections: ICrystalCollection[] | [] = json.data

                setCollectionsCheckboxes(
                    crystalCollections.map(
                        collection => (
                            { ...collection, checked: false }
                        )
                    )
                )

            } else {
                toast.error('An unexpected error occured.')
            }
            setLoading(false)
        }
        getCollections()
    }, [])

    const updateCheckStatus = (i: number) => {
        setCollectionsCheckboxes(
            collectionsCheckboxes.map((collection, currentIndex) =>
                currentIndex === i
                    ? { ...collection, checked: !collection.checked }
                    : collection
            )
        )
    }

    const selectAll = () => {
        setCollectionsCheckboxes(collectionsCheckboxes.map(collection => ({ ...collection, checked: true })))
    }
    const unSelectAll = () => {
        setCollectionsCheckboxes(collectionsCheckboxes.map(collection => ({ ...collection, checked: false })))
    }

    const handleModalClose = () => { }

    const handleAddToCollection = async () => {
        setProcessing(true)

        // let json
        // try {
        //     const resp = await fetch('/api/crystals/addToCollection', {
        //         method: 'POST',
        //         body: JSON.stringify({ crystalData, collectionsCheckboxes })
        //     })
        //     json = await resp.json()
        // } catch (error) {
        //     console.error(error)
        // }

        setProcessing(false)

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
                <form onSubmit={handleAddToCollection}>
                    <div className="mb-4 flex flex-col items-center justify-center">
                        {loading ? 'Loading...' : (
                            collectionsCheckboxes.map((collection, index) => (
                                <Checkbox
                                    key={collection._id}
                                    isChecked={collection.checked}
                                    checkHandler={() => updateCheckStatus(index)}
                                    label={collection.name}
                                    index={index}
                                />
                            )
                            ))}
                    </div>
                    <div className="text-center">
                        <button
                            disabled={processing}
                            className="inline-block transition-all duration-300 py-1.5 px-5 rounded-md bg-fuchsia-800 text-white hover:bg-fuchsia-700 disabled:bg-fuchsia-700/30"
                            type="submit"
                        >
                            {processing ? 'Please wait...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}