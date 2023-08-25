import Image from 'next/image'
import Link from 'next/link'

import { ICrystal } from "@/types/Crystal"

interface Props {
    crystals: ICrystal[] | []
}

const CrystalsGrid: React.FC<Props> = ({ crystals }) => {

    if (!crystals.length)
        return <p>We were unable to locate the crystals your are looking for! Please refine your search filters and try again.</p>

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-8">
            {
                crystals.map((crystal) => {
                    const primaryImg = crystal.images ? crystal.images[0] : "public/assets/images/crystals/image-coming-soon-placeholder.png"

                    return (
                        <div
                            key={crystal._id}
                            className="">
                            <Link
                                key={crystal._id}
                                href={`/app/crystals/${crystal._id}`}
                                className="block transition-all duration-300 text-white/90 hover:text-white font-semibold group p-4 bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 rounded-3xl shadow shadow-black"
                            >
                                <Image
                                    src={primaryImg}
                                    alt={crystal.name}
                                    height={250}
                                    width={250}
                                    priority
                                    className="transition-all duration-300 rounded-2xl mx-auto mb-2 scale-95 group-hover:scale-100"
                                />
                                <span className="inline-block w-full text-center">
                                    {crystal.name}
                                </span>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CrystalsGrid