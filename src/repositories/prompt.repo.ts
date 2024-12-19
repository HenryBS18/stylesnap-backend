import { Prompt } from '../types'
import { db } from '../utils/db'

export class PromptRepo {
  public async create(userId: number): Promise<Prompt> {
    return db.prompt.create({
      data: {
        userId
      }
    })
  }

  public async findAllByUserId(userId: number): Promise<Prompt[]> {
    return db.prompt.findMany({
      where: {
        userId
      },
      include: {
        promptMessage: true
      }
    })
  }

  public async updateById(id: number): Promise<Prompt> {
    return db.prompt.update({
      where: {
        id
      },
      data: {
        updatedAt: Date.now().toLocaleString()
      }
    })
  }
}