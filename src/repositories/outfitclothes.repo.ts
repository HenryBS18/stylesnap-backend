import { OutfitClothes } from "../types";
import { db } from "../utils/db";

export class OutfitClothesRepo {
  public async create(outfitClothes: OutfitClothes): Promise<OutfitClothes> {
    return await db.outfitClothes.create({
      data: {
        outfitId: outfitClothes.outfitId,
        clothesId: outfitClothes.clothesId
      }
    })
  }

  public async findAllByOutfitId(outfitId: number): Promise<OutfitClothes[]> {
    return await db.outfitClothes.findMany({
      where: {
        outfitId
      },
      include: {
        clothes: true
      }
    })
  }

  public async findByOutfitId(outfitId: number): Promise<OutfitClothes | null> {
    return await db.outfitClothes.findFirst({
      where: {
        outfitId
      }
    })
  }

  public async deleteByOutfitId(outfitId: number): Promise<void> {
    await db.outfitClothes.deleteMany({
      where: {
        outfitId
      }
    })
  }
}