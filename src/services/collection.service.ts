import { CollectionOutfitRepo, CollectionRepo } from "../repositories";
import { AddNewOutfitToCollectionData, Collection, CollectionOutfit } from "../types";

const collectionRepo: CollectionRepo = new CollectionRepo()
const collectionOutfitRepo: CollectionOutfitRepo = new CollectionOutfitRepo()

export class CollectionService {
  public async createNewCollection(collection: Collection): Promise<Collection> {
    return collectionRepo.create(collection)
  }

  public async getAllCollectionByUserId(userId: number): Promise<Collection[]> {
    return collectionRepo.findAllByUserId(userId)
  }

  public async addNewOutfitToCollection(data: AddNewOutfitToCollectionData): Promise<CollectionOutfit> {
    const { collectionId, outfitId } = data

    const collectionOutfit: CollectionOutfit = await collectionOutfitRepo.create({
      collectionId,
      outfitId
    })

    return collectionOutfit
  }

  public async deleteOutfitFromCollection(id: number): Promise<void> {
    try {
      await collectionOutfitRepo.deleteById(id)
    } catch (error) {
      throw new Error('Outfit not found')
    }
  }

  public async deleteById(id: number): Promise<void> {
    try {
      await collectionOutfitRepo.deleteAllByCollectionId(id)
      await collectionRepo.deleteById(id)
    } catch (error) {
      throw new Error('Collection not found')
    }
  }
}