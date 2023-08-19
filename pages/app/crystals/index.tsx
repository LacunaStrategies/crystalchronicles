import CrystalsGrid from "@/components/crystals-grid"
import AdminLayout from "@/layouts/AdminLayout"
import { crystals } from "@/lib/mock/crystals"
import { Chakra, Crystal, Element, Zodiac } from "@/types/Crystal"
import { useEffect, useState } from 'react'
import { ListRestart } from "lucide-react"

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

        console.log('filtering crystals...')
        // If no filters are set, return empty array
        if (filters.search === '' && filters.chakra === '' && filters.element === '' && filters.zodiac === '')
            return []

        // Return a filtered array
        const crystalsToReturn = crystals.filter(
            // If crystal fails any of the filter checks, exclude it from the array
            (crystal) => {
                let includeCrystal = true

                if (filters.search !== '' && crystal.name.toUpperCase().indexOf(filters.search.toUpperCase()) === -1) includeCrystal = false
                if (filters.chakra !== '' && !crystal.chakras?.includes(filters.chakra)) includeCrystal = false
                if (filters.element !== '' && !crystal.elements?.includes(filters.element)) includeCrystal = false
                if (filters.zodiac !== '' && !crystal.zodiacs?.includes(filters.zodiac)) includeCrystal = false

                return includeCrystal
            }
        )

        return crystalsToReturn
    }

    useEffect(() => {
        const res = filterCrystals()
        setFilteredCrystals(res)
    }, [filters, crystals])

    const activeFilters = (filters.search === '' && filters.chakra === '' && filters.element === '' && filters.zodiac === '')
        ? false
        : true

    return (
        <AdminLayout pageName="Search Crystals">
            <div className="py-2 px-4 bg-[#0f0344] mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white text-xl uppercase">Apply Filters</h3>
                    <button
                        className="text-white inline-block"
                        title="Clear Filters"
                        onClick={() => setFilters({ search: '', chakra: '', element: '', zodiac: '' })}
                    >
                        <ListRestart aria-hidden="true" aria-label="Clear Filters" />
                    </button>
                </div>
                <div className="flex flex-wrap justify-around">
                    <div className="w-full mb-2 sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                            value={filters.search}
                            placeholder="Search by name..."
                            className="w-full py-1 px-3 rounded-lg"
                        />
                    </div>
                    <div className="w-full mb-2 sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]">
                        <select
                            name="chakra"
                            id="chakra"
                            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                            value={filters.chakra}
                            className="w-full py-1 px-3 rounded-lg"
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
                    </div>
                    <div className="w-full mb-2 sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]">
                        <select
                            name="element"
                            id="element"
                            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                            value={filters.element}
                            className="w-full py-1 px-3 rounded-lg"
                        >
                            <option value="">Filter by Element</option>
                            <option>Earth</option>
                            <option>Fire</option>
                            <option>Water</option>
                            <option>Wind</option>
                        </select>
                    </div>
                    <div className="w-full mb-2 sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]">
                        <select
                            name="zodiac"
                            id="zodiac"
                            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                            value={filters.zodiac}
                            className="w-full py-1 px-3 rounded-lg"
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
                    </div>
                </div>

            </div>
            <CrystalsGrid crystals={activeFilters ? filteredCrystals : crystals} />
        </AdminLayout>
    )
}

export default Crystals