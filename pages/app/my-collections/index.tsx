import AdminLayout from "@/layouts/AdminLayout"
import Image from "next/image"
import Link from "next/link"
import mysticBag from '@/public/assets/images/mystic-drawstring-bag.webp'

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
            <div className="grid grid-cols-4 gap-8">
                {
                    myCollections.map(collection => (
                        <div>
                            <Link href={`/app/my-collections/${collection._id}`} className="block transition-all duration-300 scale-90 hover:scale-95">
                                <Image src={mysticBag} alt="Mystic Bag" />
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