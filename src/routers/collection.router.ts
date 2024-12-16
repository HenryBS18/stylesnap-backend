import { Router, Request, Response } from 'express'
import multer from 'multer'
import { CollectionService } from '../services'
import { Collection, CollectionOutfit } from 'types'

const collectionService: CollectionService = new CollectionService()

const upload = multer()
export const collectionRouter: Router = Router()

collectionRouter.post('/', upload.none(), async (req: Request, res: Response) => {
  try {
    const userId = req.token?.id
    const { name, type } = req.body
    const collection: Collection = await collectionService.createNewCollection({
      userId, name, type
    })

    res.status(200).send({
      collection
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

collectionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.token?.id
    const collections: Collection[] = await collectionService.getAllCollectionByUserId(userId)

    res.status(200).send({
      data: [
        ...collections
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

collectionRouter.delete('/', upload.none(), async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    await collectionService.deleteById(parseInt(id))

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

collectionRouter.post('/outfit', upload.none(), async (req: Request, res: Response) => {
  try {
    const { collectionId, outfitId } = req.body

    const collection: CollectionOutfit = await collectionService.addNewOutfitToCollection({
      collectionId: parseInt(collectionId),
      outfitId: parseInt(outfitId)
    })

    res.status(200).send({
      data: collection
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

collectionRouter.delete('/outfit', upload.none(), async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    await collectionService.deleteOutfitFromCollection(parseInt(id))

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})