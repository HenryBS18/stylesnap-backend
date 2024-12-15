export interface User {
  id?: number
  firstName: string
  lastName?: string
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface Clothes {
  id?: number
  name: string
  type: string
  color: string
  brand: string
  photoUrl: string,
  userId: number
}

export interface Outfit {
  id?: number
  userId: number
}

export interface OutfitClothes {
  id?: number
  outfitId: number
  clothesId: number
}

export interface AddNewOutfitData {
  userId: number
  clothesIds: number[]
}

export interface OutfitClothesData {
  id: number
  clothes: OutfitClothes[]
}