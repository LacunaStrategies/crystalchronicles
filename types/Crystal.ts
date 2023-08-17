export type Zodiac = "Aquarius" | "Aries" | "Cancer" | "Capricorn" | "Gemini" | "Leo" | "Libra" | "Pisces" | "Sagittarius" | "Scorpio" | "Taurus"  | "Virgo"
export type Chakra = "Crown" | "Heart" | "Root" | "Sacral" | "Solar Plexus" | "Third Eye" | "Throat"
export type Element = "Earth" | "Fire" | "Water" | "Wind"

export interface Crystal {
    _id: string
    name: string
    nickname?: string
    images?: string[]
    general_description?: string
    healing_description?: string
    cleaning_description?: string
    placement_description?: string
    colors?: string[]
    origins?: string[]
    qualaties?: string[]
    chakras?: Chakra[]
    zodiacs?: Zodiac[]
    elements?: Element[]
    combinations?: string[]
    notes?: string
}