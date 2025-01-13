import { Prompt } from '../types'
import { db } from '../utils/db'

export class PromptRepo {
  public async create(prompt: Prompt): Promise<Prompt> {
    return db.prompt.create({
      data: {
        ...prompt
      }
    })
  }

  public async findAllByUserId(userId: number): Promise<Prompt[]> {
    return db.prompt.findMany({
      where: {
        userId
      }
    })
  }
}