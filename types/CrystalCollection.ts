export interface ICrystalCollection {
    _id: string
    name: string
    user_id: string
    user_crystal_ids: string[]
}

export interface ICheckbox {
    collectionId: string
    name: string
    isChecked: boolean
}