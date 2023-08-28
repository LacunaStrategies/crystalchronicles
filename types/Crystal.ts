export type Zodiac = "Aquarius" | "Aries" | "Cancer" | "Capricorn" | "Gemini" | "Leo" | "Libra" | "Pisces" | "Sagittarius" | "Scorpio" | "Taurus" | "Virgo"
export type Chakra = "Crown" | "Heart" | "Root" | "Sacral" | "Solar Plexus" | "Third Eye" | "Throat"
export type Element = "Earth" | "Fire" | "Water" | "Wind"

export interface ICrystal {
    _id: string
    name: string
    nickname?: string
    images?: string[]
    general_description?: string
    healing_description?: string
    cleansing_description?: string
    placement_description?: string
    colors?: string[]
    origins?: string[]
    qualities?: string[]
    chakras?: Chakra[]
    zodiacs?: Zodiac[]
    elements?: Element[]
    combinations?: string[]
}

export interface IUserCrystal extends ICrystal {
    collections: string[]
    crystal_id?: string
    user_id: string
    notes?: string
    trim_crystal?: [ICrystal]
}