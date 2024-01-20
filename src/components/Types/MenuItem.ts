export type ExtraPriceType = {
    name: string,
    price: number
}

export type MenuItemType = {
    name: string,
    _id: string,
    description: string,
    price: number,
    image: string
    sizes: [ExtraPriceType],
    ingredients: [ExtraPriceType],
}