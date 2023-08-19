import AdminLayout from "@/layouts/AdminLayout"
import { crystals } from "@/lib/mock/crystals"
import { Chakra, Crystal, Element, Zodiac } from "@/types/Crystal"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'

export const Crystals = () => {

    // State Variables
    const [filteredCrystals, setFilteredCrystals] = useState<Crystal[] | []>([])
    const [filters, setFilters] = useState<{ search: string, chakra: Chakra | '', element: Element | '', zodiac: Zodiac | '' }>({
        search: '',
        chakra: '',
        element: '',
        zodiac: ''
    })

    const filterCrystals = () => {
        // If no filters are set, return empty array
        if (filters.search === '' && filters.chakra === '' && filters.element === '' && filters.zodiac === '')
            return []

        // Return a filtered array
        const crystalsToReturn = crystals.filter(
            // If crystal fails any of the filter checks, exclude it from the array
            (crystal) => {
                let includeCrystal = true

                if (filters.search !== '' && !crystal.name.includes(filters.search)) includeCrystal = false
                if (filters.chakra !== '' && !crystal.chakras?.includes(filters.chakra)) includeCrystal = false
                if (filters.element !== '' && !crystal.elements?.includes(filters.element)) includeCrystal = false
                if (filters.zodiac !== '' && !crystal.zodiacs?.includes(filters.zodiac)) includeCrystal = false

                return includeCrystal
            }
        )

        return crystalsToReturn

    }

    useEffect(() => {
        setFilteredCrystals(filterCrystals())
    }, [filters, crystals])

    return (
        <AdminLayout pageName="Search Crystals">
            <div className="py-8 space-x-4">
                <input
                    type="text"
                    name="search"
                    id="search"
                    onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                    value={filters.search}
                    placeholder="Search by name..."
                />
                <select
                    name="chakra"
                    id="chakra"
                    onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                    value={filters.chakra}
                >
                    <option value="">Filter by Chakra</option>
                    <option>Crown</option>
                    <option>Heart</option>
                    <option>Root</option>
                    <option>Sacral</option>
                    <option>Solar Plexus</option>
                    <option>Third Eye</option>
                    <option>Throat</option>
                </select>

                <select
                    name="element"
                    id="element"
                    onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                    value={filters.element}
                >
                    <option value="">Filter by Element</option>
                    <option>Earth</option>
                    <option>Fire</option>
                    <option>Water</option>
                    <option>Wind</option>
                </select>

                <select
                    name="zodiac"
                    id="zodiac"
                    onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                    value={filters.zodiac}
                >
                    <option value="">Filter by Zodiac</option>
                    <option>Aquarius</option>
                    <option>Aries</option>
                    <option>Cancer</option>
                    <option>Capricorn</option>
                    <option>Gemini</option>
                    <option>Leo</option>
                    <option>Libra</option>
                    <option>Pisces</option>
                    <option>Sagittarius</option>
                    <option>Scorpio</option>
                    <option>Taurus</option>
                    <option>Virgo</option>
                </select>

                <button
                    className="inline-block py-1.5 px-5 rounded-md bg-neutral-300"
                    onClick={() => setFilters({ search: '', chakra: '', element: '', zodiac: '' })}
                >
                    Clear Filters
                </button>
            </div>
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
        </AdminLayout>
    )
}

export default Crystals