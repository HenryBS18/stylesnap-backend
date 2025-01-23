import { Clothes, ClothesPrompt, ClothesTypeAndPhoto } from "types";
import { db } from "../utils/db";

export class ClothesRepo {
  public async create(clothes: Clothes): Promise<Clothes> {
    const { name, type, color, photoUrl, description = '', userId = 0 } = clothes

    return await db.clothes.create({
      data: {
        name, type, color, photoUrl, description, userId
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
      },
      select: {
        id: true,
        name: true,
        color: true,
        type: true,
        photoUrl: true,
      }
    })
  }

  public async findAllByUserIdForPrompt(userId: number): Promise<ClothesPrompt[]> {
    return await db.clothes.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        name: true,
        type: true,
        color: true,
        description: true
      }
    })
  }

  public async updateById(clothes: Clothes): Promise<Clothes> {
    const { id, name, type, color, photoUrl } = clothes

    return await db.clothes.update({
      data: {
        name, type, color, photoUrl
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

  
  public async getClothesByIdPrompt(id: number): Promise<ClothesTypeAndPhoto | null> {
    return await db.clothes.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        type: true,
        photoUrl: true
      }
    })
  }

  public async getAllClothesTypeAndPhoto(userId: number): Promise<ClothesTypeAndPhoto[]> {
    return await db.clothes.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        type: true,
        photoUrl: true
      }
    })
  }
}

