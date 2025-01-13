import { GoogleGenerativeAI } from "@google/generative-ai"
import { CreateGeminiPromptData } from "../types"
import { readFileSync } from "fs"

const key: string = process.env.GEMINI_API_KEY!
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(key)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export class GeminiService {
  public async createPrompt({ clothes, prompt }: CreateGeminiPromptData): Promise<String> {
    try {
      const chat = model.startChat({
        systemInstruction: {
          role: 'user',
          parts: [
            {
              text: 'i want you to choose me an outfit based on my clothes, i will give you my clothes list, give me the answer in json format like this: [{"id": <clothesId>,"name": <clothesName>, "type": <clothesType>}, {clothes: [{"id": <clothesId>,"name": <clothesName>, "type": <clothesType>}, ..., ...]. give the answer dont ask back to me'
            },
            {
              text: clothes,
            }
          ]
        }
      })

      const result = await chat.sendMessage(prompt)
      const response = result.response.text()

      return response
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
    }

    throw new Error('oops')
  }

  public async createImageDescription(file: Express.Multer.File): Promise<string> {
    try {
      const content = await model.generateContent([
        'Describe this clothes',
        {
          inlineData: {
            data: Buffer.from(readFileSync(file.path)).toString('base64'),
            mimeType: file.mimetype
          }
        }
      ])

      return content.response.text()
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
    }

    throw new Error('oops')
  }
}