import { Collection } from "../types";
import { db } from "../utils/db";

export class CollectionRepo {
  public async create(collection: Collection): Promise<Collection> {
    return db.collection.create({
      data: {
        userId: collection.userId,
        name: collection.name,
        type: collection.type
      }
    })
  }

  public async findAllByUserId(userId: number): Promise<Collection[]> {
    return await db.collection.findMany({
      where: {
        userId
      },
      include: {
        collectionOutfit: {
          include: {
            outfit: true
          }
        }
      }
    })
  }

  public async deleteById(collectionid: number): Promise<void> {
    await db.collection.delete({
      where: {
        id: collectionid
      }
    })
  }
}