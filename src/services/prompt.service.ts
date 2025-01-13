import { ClothesPrompt, CreatePromptData, Prompt } from "../types"
import { PromptRepo } from "../repositories"
import { ClothesService } from "./clothes.service"
import { GeminiService } from "./gemini.service"

const promptRepo: PromptRepo = new PromptRepo()
const clothesService: ClothesService = new ClothesService()
const geminiService: GeminiService = new GeminiService()

export class PromptService {
  public async create(data: CreatePromptData): Promise<Prompt> {
    const { userId, message } = data

    try {
      const clothes: ClothesPrompt[] = await clothesService.getAllClothesPromptByUserId(userId)

      const genRes = (await geminiService.createPrompt({
        clothes: JSON.stringify(clothes),
        prompt: message
      })).toString()

      return await promptRepo.create({
        userId, userMessage: message, resultMessage: genRes
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }

    throw new Error('Failed to create prompt')
  }

  public async getAllPromptByUserId(userId: number): Promise<Prompt[]> {
    return promptRepo.findAllByUserId(userId)
  }
}