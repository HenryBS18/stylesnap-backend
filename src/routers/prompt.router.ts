import { Router, Request, Response } from "express";
import multer from "multer";
import { PromptService, GeminiService } from "../services";
import { Prompt } from "../types";

const promptService: PromptService = new PromptService()
const geminiService: GeminiService = new GeminiService()
const upload = multer({
  dest: 'uploads/',
})
export const promptRouter: Router = Router()

promptRouter.post('/', async (req: Request, res: Response) => {
  const userId = req.token?.id
  const { message } = req.body

  const prompt: Prompt = await promptService.create({
    userId, message
  })

  res.status(200).send(prompt)
})

promptRouter.get('/', async (req: Request, res: Response) => {
  const userId = req.token?.id

  const prompts: Prompt[] = await promptService.getAllPromptByUserId(userId)

  res.status(200).send({
    data: [
      ...prompts
    ]
  })
})

promptRouter.post('/desc', upload.single('image'), async (req: Request, res: Response) => {
  const file = req.file

  const text = await geminiService.createImageDescription(file!)
  res.status(200).send({
    result: text
  })
})