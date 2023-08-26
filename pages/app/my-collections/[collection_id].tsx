import AdminLayout from "@/layouts/AdminLayout"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"

export const CollectionPage = () => {

    // Hooks
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const crystalData = undefined

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
            </div>

            <div className="mb-20">
                <h1 className="text-center text-medium text-4xl uppercase">{}</h1>
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

export default CollectionPage