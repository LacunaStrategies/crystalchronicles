import AdminLayout from "@/layouts/AdminLayout"
import Image from "next/image"
import Link from "next/link"
import mysticBag from '@/public/assets/images/mystic-drawstring-bag.webp'
import mysticPlus from '@/public/assets/images/mystic-plus-icon.webp'

interface Props { }

const myCollections = [
    {
        _id: '1',
        name: 'Wish List',
    },
    {
        _id: '2',
        name: 'Healing Stones',
    },
    {
        _id: '3',
        name: '2023 Crystals',
    },
    {
        _id: '4',
        name: 'Random Collection',
    },
]

export const Crystals = () => {
    return (
        <AdminLayout pageName="My Collections">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center justify-center">
                    <button>
                        <Image src={mysticPlus} width={120} height={120} alt="Mystic Plus Symbol" className="mb-4" />
                        <div className="w-full text-center">Add New Collection</div>
                    </button>
                </div>
                {
                    myCollections.map(collection => (
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