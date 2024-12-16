import { CollectionOutfit } from "../types";
import { db } from "../utils/db";

export class CollectionOutfitRepo {
  public async create(collectionOutfit: CollectionOutfit): Promise<CollectionOutfit> {
    return await db.collectionOutfit.create({
      data: {
        collectionId: collectionOutfit.collectionId,
        outfitId: collectionOutfit.outfitId
      }
    })
  }

  public async deleteById(id: number): Promise<void> {
    await db.collectionOutfit.delete({
      where: {
        id
      }
    })
  }

  public async deleteAllByCollectionId(collectionId: number): Promise<void> {
    await db.collectionOutfit.deleteMany({
      where: {
        collectionId
      }
    })
  }
}