export interface ICrystalCollection {
    _id: string
    name: string
    user_id: string
}

export interface ICheckbox {
    collectionId: string
    name: string
    isChecked: boolean
}