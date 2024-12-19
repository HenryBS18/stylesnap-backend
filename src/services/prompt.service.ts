import { Clothes, CreatePromptData, Prompt, PromptMessage } from "../types"
import { PromptMessageRepo, PromptRepo } from "../repositories"
import { ClothesService } from "./clothes.service"
import { GeminiService } from "./gemini.service"
import { Content } from "@google/generative-ai"

const promptRepo: PromptRepo = new PromptRepo()
const promptMessageRepo: PromptMessageRepo = new PromptMessageRepo()
const clothesService: ClothesService = new ClothesService()
const geminiService: GeminiService = new GeminiService()

export class PromptService {
  public async create(userId: number): Promise<Prompt> {
    return await promptRepo.create(userId)
  }

  public async createPrompt(data: CreatePromptData): Promise<string> {
    const { userId, promptId, message } = data

    const history: Content[] = []
    const clothes: Clothes[] = await clothesService.getAllClothesByUserId(userId)
    console.log(JSON.stringify(clothes));
    history.push({
      role: 'user',
      parts: [
        {
          text: JSON.stringify(clothes)
        }
      ]
    })

    history.push({
      role: 'model',
      parts: [
        {
          text: 'you have so many clothes'
        }
      ]
    })
2
    history.push({
      role: 'user',
      parts: [
        {
          text: 'this is my list of clothes, can you help me to choose what clothes combination suit me?, please give clothesId with json format, please dont give any message only the json, give 1 outfit'
        }
      ]
    })

    history.push({
      role: 'model',
      parts: [
        {
          text: "sure i can help you choose outfit based on your clothes list, i will give you response in json format: {clothes: [{'id': <clothesId>,'name': <clothesName>, 'type': <clothesType>}, {clothes: [{'id': <clothesId>,'name': <clothesName>, 'type': <clothesType>}, ..., ...]}"
        }
      ]
    })

    const genRes = await geminiService.createPrompt(history, message)

    history.push({
      role: 'user',
      parts: [
        {
          text: message
        }
      ]
    })

    await promptMessageRepo.create({
      promptId, message, role: 'user'
    })

    await promptMessageRepo.create({
      promptId, message: genRes.toString(), role: 'model'
    })

    return genRes.toString()
  }

  public async getAllPromptByUserId(userId: number): Promise<Prompt[]> {
    return promptRepo.findAllByUserId(userId)
  }
}