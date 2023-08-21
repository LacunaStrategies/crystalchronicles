import AdminLayout from "@/layouts/AdminLayout"
import Image from "next/image"
import Link from "next/link"
import mysticBag from '@/public/assets/images/mystic-drawstring-bag.webp'
import mysticPlus from '@/public/assets/images/mystic-plus-icon.webp'
import { crystalCollection } from "@/lib/mock/crystalCollections"

export const Crystals = () => {
    return (
        <AdminLayout pageName="My Collections">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center justify-center">
                    <button>
                        <Image src={mysticPlus} width={85} height={85} alt="Mystic Plus Symbol" className="mb-4 mx-auto" />
                        <div className="w-full text-center">Add New Collection</div>
                    </button>
                </div>
                {
                    crystalCollection.map(collection => (
                        <div key={collection.name}>
                            <Link href={`/app/my-collections/${collection._id}`} className="block transition-all duration-300 scale-90 hover:scale-95">
                                <Image src={mysticBag} alt="Mystic Bag" width={500} height={480} priority />
                                <div className="uppercase text-xl text-center">{collection.name}</div>
                            </Link>
                        </div>
                    ))
                }
                
            </div>
        </AdminLayout>
    )
}

export default Crystals