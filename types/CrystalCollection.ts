export interface ICrystalCollection {
    _id: string
    name: string
    user_id: string
}

export interface ICollectionCheckbox extends ICrystalCollection {
    checked: boolean
}