import { PromptMessage } from 'types'
import { db } from '../utils/db'

export class PromptMessageRepo {
  public async create(data: PromptMessage): Promise<PromptMessage> {
    const { promptId, role, message } = data

    return db.promptMessage.create({
      data: {
        role, message, promptId
      }
    })
  }

  public async findAllByPromptId(promptId: number): Promise<PromptMessage[]> {
    return db.promptMessage.findMany({
      where: {
        promptId
      }
    })
  }
}