export type Record = {
    key: string
    image: string
    name: string
    label: string
    numberOfPolygons: number
}

export type FracturedImages = {
    allGroups: Record[]
    test: Record[]
    train: Record[]
    valid: Record[]
}

export type Filter = {
    color: string
    borderColor: string
    bgColor: string
    label: string
}
