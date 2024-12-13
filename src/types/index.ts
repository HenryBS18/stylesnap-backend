export interface User {
  id?: number
  firstName: string
  lastName?: string
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