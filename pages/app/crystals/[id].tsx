import AdminLayout from "@/layouts/AdminLayout"
import { crystals, getCrystal } from "@/lib/mock/crystals"
import { Crystal } from "@/types/Crystal"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"
interface Props { }

export const CrystalPage = () => {

    // State Variables
    const [addingToCollection, setAddingToCollection] = useState(false)

    // Hooks
    const router = useRouter()

    // Page Data :: This will actually be generated from GetStaticPaths and GetStaticParams when moved to DB
    const crystalData: Crystal | undefined = crystals.find(crystal => crystal._id === router.query.id)

    const fakeInsert = (delay: number) => {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay)
        })
    }

    /**
     * * Add To Collection
     * @dev Adds crystal to user's collection of crystals
     * @param id string
     */
    const addToCollection = async (id: string) => {
        setAddingToCollection(true)
        await fakeInsert(1500)
        alert('This crystal has been added to your collection! Not really...we\'re not hooked up to the database yet. Bet it still feels nice, though! You can go check out the collection we created for you and pretend this one\'s in there now!')
        setAddingToCollection(false)
    }

    if (!crystalData)
        return (
            <AdminLayout pageName="Crystal Details">
                <h1 className="text-center text-medium text-4xl uppercase mb-8">Crystal Not Found!</h1>
                <div className="text-center">
                    <Link
                        className="inline-block transition-all duration-300 bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 px-5 rounded-md"
                        href="/app/crystals">Back to Search</Link>
                </div>
            </AdminLayout>
        )

    return (
        <AdminLayout pageName="Crystal Details">

            <div className="flex justify-between mb-8">
                <div>
                    <Link
                        className="inline-block transition-all duration-300 bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 px-5 rounded-md"
                        href="/app/crystals">Back to Search</Link>
                </div>
                <div>
                    <button
                        className="transition-all duration-300 bg-[#130883] hover:bg-[#130883]/80 text-white py-1.5 px-5 rounded-md disabled:bg-[#130883]/40"
                        onClick={() => addToCollection(crystalData._id)}
                        disabled={addingToCollection}
                    >{addingToCollection ? 'Please Wait...' : '+ Add to Collection'}</button>
                </div>
            </div>

            <div className="mb-20">
                <Image
                    src={crystalData?.images ? crystalData.images[0] : ''}
                    alt={crystalData.name}
                    width={400}
                    height={400}
                    priority
                    className="mx-auto border shadow shadow-black mb-2"
                />
                <h1 className="text-center text-medium text-4xl uppercase">{crystalData?.name}</h1>
            </div>

            {/* General Description */}
            {
                crystalData.general_description && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">General Description</h2>
                            <p>{crystalData.general_description}</p>
                        </div>
                    </div>
                )
            }

            {/* Healing Description */}
            {
                crystalData.healing_description && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">General Description</h2>
                            <p>{crystalData.healing_description}</p>
                        </div>
                    </div>
                )
            }

            {/* Chakras */}
            {
                crystalData.chakras && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">General Description</h2>
                            <ul className="list-disc pl-10">
                                {
                                    crystalData.chakras.map(chakra => (
                                        <li key={chakra}>
                                            {chakra}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </AdminLayout>
    )
}

export default CrystalPage