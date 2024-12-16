import { Planner } from '../types'
import { db } from '../utils/db'

export class PlannerRepo {
  public async create(planner: Planner): Promise<Planner> {
    const { userId, outfitId, date } = planner

    return await db.planner.create({
      data: {
        userId,
        outfitId,
        date
      }
    })
  }

  public async findAllByUserId(userId: number): Promise<Planner[]> {
    return await db.planner.findMany({
      where: {
        userId
      },
      include: {
        outfit: {
          include: {
            outfitClothes: {
              include: {
                clothes: true
              }
            }
          }
        }
      }
    })
  }

  public async deleteById(id: number): Promise<void> {
    await db.planner.delete({
      where: {
        id
      }
    })
  }
}