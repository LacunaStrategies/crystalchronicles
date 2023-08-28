import AdminLayout from "@/layouts/AdminLayout"
import Link from "next/link"
import { useEffect, useState } from "react"
import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { ICrystalCollection } from "@/types/CrystalCollection"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

interface Props {
    collectionData: ICrystalCollection | undefined
}

export const CrystalPage = ({ collectionData }: Props) => {

    useEffect(() => {
        const getCollectionPageData = async () => {
            let json
            try {
                const resp = await fetch(`/api/collections/getCollectionPageData?collectionId=64eb93a578ba304f7e26a8e2`)
                json = await resp.json()
            } catch (error) {
                console.error(error)
            }

            console.log(json)
        }

        getCollectionPageData()
    }, [])
    // Hooks
    const [showModal, setShowModal] = useState(false)

    if (!collectionData)
        return (
            <AdminLayout pageName="Crystal Details">
                <h1 className="text-center text-medium text-4xl uppercase mb-8">Collection Not Found!</h1>
                <div className="text-center">
                    <Link
                        className="inline-block transition-all duration-300 bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 px-5 rounded-md"
                        href="/app/my-collections">Back to Collections</Link>
                </div>
            </AdminLayout>
        )

    return (
        <AdminLayout pageName="Crystal Details">

            <div className="flex justify-between mb-8">
                <div>
                    <Link
                        className="inline-block transition-all duration-300 bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 px-5 rounded-md"
                        href="/app/my-collections">Back to Collections</Link>
                </div>
            </div>

            <div className="mb-20">
                <h1 className="text-center text-medium text-4xl uppercase">{collectionData.name}</h1>
            </div>

            <div>
                <pre>
                    {/* {JSON.stringify(collectionData, null, 4)} */}
                </pre>
            </div>
        </AdminLayout>
    )
}

export default CrystalPage