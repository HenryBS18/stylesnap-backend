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
  photoUrl: string,
  description?: string
  userId?: number
}

export interface ClothesPrompt {
  id: number
  name: string
  type: string
  color: string
  description: string
}

export interface Outfit {
  id?: number
  userId?: number
}

export interface OutfitClothes {
  id?: number
  outfitId: number
  clothesId: number
}

export interface CreateOutfitData {
  userId: number
  clothesIds: number[]
}

export interface OutfitClothesData {
  id: number
  clothes: OutfitClothes[]
}

export interface Collection {
  id?: number
  userId: number
  name: string
  type: string
}

export interface CollectionOutfit {
  id?: number
  collectionId: number
  outfitId: number
}

export interface AddNewOutfitToCollectionData {
  collectionId: number
  outfitId: number
}

export interface DeleteOutfitFromCollectionData {
  collectionId: number
  outfitId: number
}

export interface Planner {
  id?: number
  userId: number
  outfitId: number
  date: Date
}

export interface Prompt {
  id?: number
  userId: number
  createdAt?: Date
  userMessage: string
  resultMessage: string
}

export interface CreatePromptData {
  userId: number
  message: string
}

export interface CreateGeminiPromptData {
  clothes: string
  prompt: string
}

export interface ClothesTypeAndPhoto {
  id: number
  type: string
  photoUrl: string
}