import { Router, Request, Response } from 'express'
import { OutfitService } from '../services'
import { OutfitClothes } from '../types'
import multer from 'multer'

const outfitService: OutfitService = new OutfitService()
const upload = multer()
export const outfitRouter: Router = Router()

outfitRouter.post('/', upload.none(), async (req: Request, res: Response) => {
  try {
    const { tops, bottoms, fullbody, outwear, shoes, accessories } = req.body
    const userId = req.token?.id
    const clothesIds = [tops, bottoms, fullbody, outwear, shoes, accessories].filter(e => e != undefined).map(e => parseInt(e))

    const outfitClothes: OutfitClothes[] = await outfitService.create({
      userId,
      clothesIds
    })

    res.status(200).send({
      data: [
        ...outfitClothes
      ]
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

outfitRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.token?.id

    const outfitClothes = await outfitService.getAllByUserId(userId)

    res.status(200).send({
      data: outfitClothes
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

outfitRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)

    await outfitService.deleteById(id)

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})