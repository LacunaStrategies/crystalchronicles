import { ModalAddToCollection } from "@/components/modals/add-to-collection"
import AdminLayout from "@/layouts/AdminLayout"
import { ICrystal } from "@/types/Crystal"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { GetStaticPaths, GetStaticProps } from "next"
import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

export const getStaticPaths: GetStaticPaths = async () => {

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const crystals = await db.collection('trim_crystals').find().project({ _id: -1 }).toArray()

    const paths = crystals.map(crystal => (
        {
            params: {
                id: String(crystal._id)
            }
        }
    ))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    // FFS
    let crystalId
    if (!params?.id) {
        crystalId = ''
    } else if (Array.isArray(params?.id)) {
        crystalId = params?.id[0]
    } else {
        crystalId = params?.id
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const crystalData = await db.collection('trim_crystals').findOne({ _id: new ObjectId(crystalId) })

    if (!crystalData)
        return {
            props: {
                crystalData: undefined
            }
        }

    return {
        props: {
            crystalData: {
                ...crystalData,
                _id: String(crystalData._id),
                images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
            }
        }
    }
}

interface Props {
    crystalData: ICrystal | undefined
}

export const CrystalPage = ({ crystalData }: Props) => {

    // Hooks
    const [showModal, setShowModal] = useState(false)

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

            {
                showModal && (
                    <ModalAddToCollection
                        crystalData={crystalData}
                        setShowModal={setShowModal}
                    />
                )
            }
        </AdminLayout>
    )
}

export default CrystalPage