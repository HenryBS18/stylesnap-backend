import { GoogleGenerativeAI, Content } from "@google/generative-ai"

const key: string = process.env.GEMINI_API_KEY!
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(key)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export class GeminiService {
  public async createPrompt(history: Content[], prompt: string): Promise<String> {
    const chat = model.startChat({
      history: history,
    })

    const result = await chat.sendMessage(prompt)
    const response = result.response.text()

    return response
  }
}