import { Clothes } from "types";
import { db } from "../utils/db";

export class ClothesRepo {
  public async create(clothes: Clothes): Promise<Clothes> {
    const { name, type, color, brand, photoUrl, userId } = clothes

    return await db.clothes.create({
      data: {
        name, type, color, brand, photoUrl, userId
      }
    })
  }

  public async findById(id: number): Promise<Clothes | null> {
    return await db.clothes.findFirst({
      where: {
        id
      }
    })
  }

  public async findAllByUserId(userId: number): Promise<Clothes[]> {
    return await db.clothes.findMany({
      where: {
        userId
      }
    })
  }

  public async updateById(clothes: Clothes): Promise<Clothes> {
    const { id, name, type, color, brand, photoUrl } = clothes

    return await db.clothes.update({
      data: {
        name, type, color, brand, photoUrl
      },
      where: {
        id
      }
    })
  }

  public async deleteById(id: number): Promise<Clothes> {
    return await db.clothes.delete({
      where: {
        id
      }
    })
  }
}