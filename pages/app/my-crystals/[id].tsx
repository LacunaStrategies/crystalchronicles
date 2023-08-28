import AdminLayout from "@/layouts/AdminLayout"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { IUserCrystal } from "@/types/Crystal"

export const CrystalPage = () => {

    // Hooks
    const [crystalData, setCrystalData] = useState<IUserCrystal | undefined>(undefined)
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    let { id } = router.query

    if (Array.isArray(id))
        id = id.join()

    if (!(typeof id === 'string'))
        id = ''

    useEffect(() => {
        const getUserCrystalData = async () => {
            let json

            try {
                const resp = await fetch(`/api/crystals/getUserCrystal?userCrystalId=${id}`)
                json = await resp.json()
            } catch (error) {
                console.error(error)
            }

            const data = json?.data
            setCrystalData(data?.crystalData)

        }
        getUserCrystalData()
    }, [])

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
                        onClick={() => setShowModal(true)}
                    >+ Add to Collection</button>
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

            {/* Colors */}
            {
                crystalData.colors && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Color</h2>
                            <ul className="list-disc pl-10">
                                {
                                    crystalData.colors.map(color => (
                                        <li key={color}>
                                            {color}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }

            {/* Origins */}
            {
                crystalData.origins && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Origins</h2>
                            <ul className="list-disc pl-10">
                                {
                                    crystalData.origins.map(origin => (
                                        <li key={origin}>
                                            {origin}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }

            {/* Healing Description */}
            {
                crystalData.healing_description && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Healing Description</h2>
                            <p>{crystalData.healing_description}</p>
                        </div>
                    </div>
                )
            }

            {/* Cleansing Description */}
            {
                crystalData.healing_description && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Cleansing Description</h2>
                            <p>{crystalData.cleansing_description}</p>
                        </div>
                    </div>
                )
            }

            {/* Pacement Description */}
            {
                crystalData.placement_description && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Placement Description</h2>
                            <p>{crystalData.placement_description}</p>
                        </div>
                    </div>
                )
            }

            {/* Chakras */}
            {
                crystalData.chakras && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Chakras</h2>
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

            {/* Zodiacs */}
            {
                crystalData.zodiacs && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Zodiacs</h2>
                            <ul className="list-disc pl-10">
                                {
                                    crystalData.zodiacs.map(zodiac => (
                                        <li key={zodiac}>
                                            {zodiac}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }

            {/* Elements */}
            {
                crystalData.elements && (
                    <div className="mb-12">
                        <div className="bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 p-8 rounded-3xl text-white lg:max-w-3xl lg:mx-auto">
                            <h2 className="text-2xl font-medium mb-2">Zodiacs</h2>
                            <ul className="list-disc pl-10">
                                {
                                    crystalData.elements.map(element => (
                                        <li key={element}>
                                            {element}
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