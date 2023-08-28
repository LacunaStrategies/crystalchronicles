import AdminLayout from "@/layouts/AdminLayout"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ICrystalCollection } from "@/types/CrystalCollection"
import { IUserCrystal } from "@/types/Crystal"
import Image from "next/image"
import comingSoonImg from "@/public/assets/images/crystals/image-coming-soon-placeholder.png"

export const CrystalPage = () => {

    // Hooks
    const [collectionData, setCollectionData] = useState<ICrystalCollection | undefined>(undefined)
    const [crystalData, setCrystalData] = useState<IUserCrystal[] | []>([])
    const router = useRouter()

    let { id } = router.query

    if (Array.isArray(id)) {
        id = id.join()
    }
    
    if (!(typeof id === 'string')) {
        id = ''
    }
    
    useEffect(() => {
        const getCollectionPageData = async () => {
            let json
            try {
                const resp = await fetch(`/api/collections/getCollectionPageData?collectionId=${id}`)
                json = await resp.json()
            } catch (error) {
                console.error(error)
            }

            console.log(json)
            const { data } = json
            setCollectionData(data.collectionData)
            setCrystalData(data.crystalData)
        }

        getCollectionPageData()
    }, [id])

    

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

            {
                !crystalData.length ? (
                    <div className="text-center">
                        <p className="text-2xl mb-8">This collection doesn't appear to have any crystals added! Add some now?</p>
                        <Link href="/app/crystals">Search Crystals</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-8">
                        {
                            crystalData.map((crystal) => {
                                const primaryImg = crystal.images ?
                                    crystal.images[0] :
                                    crystal.trim_crystal && crystal.trim_crystal[0].images ?
                                        crystal.trim_crystal[0].images[0] :
                                        comingSoonImg

                                return (
                                    <div
                                        key={crystal._id}
                                        className="">
                                        <Link
                                            key={crystal._id}
                                            href={`/app/my-crystals/${crystal._id}`}
                                            className="block transition-all duration-300 text-white/90 hover:text-white font-semibold group p-4 bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 rounded-3xl shadow shadow-black"
                                        >
                                            <Image
                                                src={primaryImg}
                                                alt={
                                                    crystal.name ?
                                                        crystal.name + ' Image' :
                                                        crystal.trim_crystal ?
                                                            crystal.trim_crystal[0].name + ' Image' :
                                                            'Placeholder Image'
                                                }
                                                height={250}
                                                width={250}
                                                priority
                                                className="transition-all duration-300 rounded-2xl mx-auto mb-2 scale-95 group-hover:scale-100"
                                            />
                                            <span className="inline-block w-full text-center">
                                                {
                                                    crystal.name ?
                                                        crystal.name :
                                                        crystal.trim_crystal ?
                                                            crystal.trim_crystal[0].name :
                                                            ''
                                                }
                                            </span>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </AdminLayout>
    )
}

export default CrystalPage
