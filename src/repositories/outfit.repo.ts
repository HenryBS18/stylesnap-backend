import { Outfit } from "../types";
import { db } from "../utils/db";

export class OutfitRepo {
  public async create(userId: number): Promise<Outfit> {
    return await db.outfit.create({
      data: {
        userId
      }
    })
  }

  public async findAllByUserId(userId: number) {
    return await db.outfit.findMany({
      where: {
        userId
      }
    })
  }

  public async deleteById(id: number): Promise<void> {
    await db.outfit.delete({
      where: {
        id
      }
    })
  }

  public async findById(id: number): Promise<Outfit | null> {
    return await db.outfit.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        outfitClothes: {
          select: {
            clothes: true
          }
        }
      }
    })
  }
}