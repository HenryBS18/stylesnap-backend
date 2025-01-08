import { ClothesPrompt, CreatePromptData, Prompt } from "../types"
import { PromptMessageRepo, PromptRepo } from "../repositories"
import { ClothesService } from "./clothes.service"
import { GeminiService } from "./gemini.service"

const promptRepo: PromptRepo = new PromptRepo()
const promptMessageRepo: PromptMessageRepo = new PromptMessageRepo()
const clothesService: ClothesService = new ClothesService()
const geminiService: GeminiService = new GeminiService()

export class PromptService {
  public async create(userId: number): Promise<Prompt> {
    return await promptRepo.create(userId)
  }

  public async createPrompt(data: CreatePromptData): Promise<any> {
    const { userId, promptId, message } = data

    try {
      const clothes: ClothesPrompt[] = await clothesService.getAllClothesPromptByUserId(userId)

      const genRes = (await geminiService.createPrompt({
        clothes: JSON.stringify(clothes),
        prompt: message
      })).toString()

      await promptMessageRepo.create({
        promptId, message, role: 'user'
      })

      await promptMessageRepo.create({
        promptId, message: genRes.toString(), role: 'model'
      })

      const parsedClothes: ClothesPrompt[] = JSON.parse(genRes.replace('```json', '').replace('```', ''))

      return parsedClothes
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }

  }

  public async getAllPromptByUserId(userId: number): Promise<Prompt[]> {
    return promptRepo.findAllByUserId(userId)
  }
}