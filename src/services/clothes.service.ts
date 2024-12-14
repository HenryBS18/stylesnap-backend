import { ClothesRepo } from "../repositories";
import { Clothes } from "../types";
import { UploadApiResponse, v2 } from 'cloudinary'
import crypto from 'crypto'
import fs from 'fs'

const clothesRepo: ClothesRepo = new ClothesRepo()
const cloudinary = v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

export class ClothesService {
  public async AddNewClothes(clothes: Clothes): Promise<Clothes> {
    return clothesRepo.create(clothes)
  }

  public async getClothesById(id: number): Promise<Clothes> {
    const clothes: Clothes | null = await clothesRepo.findById(id)

    if (!clothes) {
      throw new Error('Clothes not found')
    }
    return clothes
  }

  public async getAllClothesByUserId(userId: number): Promise<Clothes[]> {
    return clothesRepo.findAllByUserId(userId)
  }

  public async updateClothesById(clothes: Clothes): Promise<Clothes> {
    return clothesRepo.updateById(clothes)
  }

  public async deleteClothesById(id: number): Promise<Clothes> {
    return clothesRepo.deleteById(id)
  }

  public async uploadClothesImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    const uuid: string = crypto.randomUUID()
    const path: string = `uploads/${file.filename}`

    const result = await cloudinary.uploader.upload(path, {
      folder: 'clothes',
      public_id: uuid,
    }, (error) => {
      if (error) {
        throw new Error(error.message)
      }
    },)

    if (fs.existsSync(path)) {
      fs.rmSync(path)
    }

    return result
  }
}