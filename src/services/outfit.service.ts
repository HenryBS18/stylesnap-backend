import { AddNewOutfitData, Outfit, OutfitClothes, OutfitClothesData } from "../types";
import { OutfitClothesRepo, OutfitRepo } from "../repositories";

const outfitRepo: OutfitRepo = new OutfitRepo()
const outfitClothesRepo: OutfitClothesRepo = new OutfitClothesRepo()

export class OutfitService {
  public async addNewOutfit(data: AddNewOutfitData): Promise<OutfitClothes[]> {
    const { userId, clothesIds } = data

    const outfit: Outfit = await outfitRepo.create(userId)
    let outfitClothes: OutfitClothes[] = []

    try {
      outfitClothes = await Promise.all(
        clothesIds.map((id) =>
          outfitClothesRepo.create({
            outfitId: outfit.id!,
            clothesId: id,
          })
        )
      )
    } catch (error) {
      await this.deleteById(outfit.id!)
      throw new Error('Error adding outfit')
    }

    return outfitClothes
  }

  public async getAllOutfitByUserId(userId: number): Promise<OutfitClothesData[]> {
    const outfits: Outfit[] = await outfitRepo.findAllByUserId(userId)

    const outfitClothes: OutfitClothesData[] = await Promise.all(
      outfits.map(async (e) => {
        return {
          id: e.id,
          clothes: await outfitClothesRepo.findAllByOutfitId(e.id!),
        };
      })
    ) as OutfitClothesData[]

    return outfitClothes
  }

  public async deleteById(id: number): Promise<void> {
    try {
      await outfitClothesRepo.deleteByOutfitId(id)
      await outfitRepo.deleteById(id)
    } catch (error) {
      throw new Error('Invalid outfit id')
    }
  }
}