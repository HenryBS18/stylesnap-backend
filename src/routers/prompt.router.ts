import { Router, Request, Response } from "express";
import multer from "multer";
import { PromptService, GeminiService, ClothesService } from "../services";
import { Prompt } from "../types";

const promptService: PromptService = new PromptService()
const geminiService: GeminiService = new GeminiService()
const clothesService: ClothesService = new ClothesService()
const upload = multer({
  dest: 'uploads/',
})
export const promptRouter: Router = Router()

promptRouter.post('/', upload.none(), async (req: Request, res: Response) => {
  const userId = req.token?.id
  const { message } = req.body

  const prompt: Prompt = await promptService.create({
    userId, message
  })

  const resp = prompt.resultMessage.trim().replace('```json', '').replace('```', '').replace('\n', '')

  const object = JSON.parse(resp)

  const clothes = await Promise.all(
    object.map(async (obj: any) => {
      const clothesPromises = obj.map((item: any) =>
        clothesService.getClothesPromptResult(item.id)
      );
      return Promise.all(clothesPromises);
    })
  );

  const p = {
    ...prompt,
    resultMessage: clothes
  }

  res.status(200).send(p)
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