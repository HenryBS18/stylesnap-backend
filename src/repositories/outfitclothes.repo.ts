import { OutfitClothes } from "../types";
import { db } from "../utils/db";

export class OutfitClothesRepo {
  public async createOutfitClothes(outfitClothes: OutfitClothes): Promise<OutfitClothes> {
    return await db.outfitClothes.create({
      data: {
        outfitId: outfitClothes.outfitId,
        clothesId: outfitClothes.clothesId
      }
    })
  }

  public async findOutfitClothesByOutfitId(outfitId: number): Promise<OutfitClothes[]> {
    return await db.outfitClothes.findMany({
      where: {
        outfitId
      },
      include: {
        clothes: true
      }
    })
  }

  public async deleteOutfitClothesByOutfitId(outfitId: number): Promise<void> {
    await db.outfitClothes.deleteMany({
      where: {
        outfitId
      }
    })
  }
}