import { Router, Request, Response } from 'express'
import multer from 'multer'
import { UploadApiResponse } from 'cloudinary'
import { ClothesService, GeminiService } from '../services'
import { Clothes, ClothesTypeAndPhoto } from '../types'

const clothesService: ClothesService = new ClothesService()
const geminiService: GeminiService = new GeminiService()
const upload = multer({
  dest: 'uploads/',
})
export const clothesRouter: Router = Router()

clothesRouter.post('/', upload.single('image'), async (req: Request, res: Response) => {
  let uuid: string | undefined

  try {
    const { name, type, color } = req.body
    const file = req.file
    const userId = req.token?.id

    if (!file) {
      res.status(400).send({
        message: 'No file specified'
      })
      return
    }

    const description: string = await geminiService.createImageDescription(file)

    const uploadResult: UploadApiResponse = await clothesService.uploadClothesImage(file)
    const photoUrl: string = uploadResult.url.replace('http', 'https')

    uuid = photoUrl.split('clothes/')[1].split('.')[0]

    const clothes: Clothes = {
      name, type, color, photoUrl, description, userId
    }

    const response = await clothesService.AddNewClothes(clothes)

    res.status(200).send(response)
  } catch (error) {
    if (error instanceof Error) {
      if (uuid) await clothesService.deleteImage(uuid)

      res.status(400).send({
        message: error.message
      })
    }
  }
})

clothesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId: number = req.token?.id
    const { typePhoto } = req.query

    if (typePhoto === 'true') {
      const clothes: ClothesTypeAndPhoto[] = await clothesService.getAllClothesTypeAndPhoto(userId)

      res.status(200).send(clothes)
      return
    }

    const clothes: Clothes[] = await clothesService.getAllClothesByUserId(userId)

    res.status(200).send({
      data: clothes
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

clothesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string, 10)

    const clothes: Clothes = await clothesService.getClothesById(id)

    res.status(200).send({
      ...clothes
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send({
        message: error.message
      })
    }
  }
})

clothesRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string, 10)
    const { name, type, color, photoUrl, description, userId } = req.body

    const clothes: Clothes = {
      id, name, type, color, photoUrl, description, userId
    }

    await clothesService.updateClothesById(clothes)

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

clothesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string, 10)

    await clothesService.deleteClothesById(id)

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

clothesRouter.get('/type-photo', async (req: Request, res: Response) => {
  try {
    const userId: number = req.token?.id
    const clothes: ClothesTypeAndPhoto[] = await clothesService.getAllClothesTypeAndPhoto(userId)

    res.status(200).send(clothes)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})