import { Router, Request, Response } from "express";
import multer from "multer";
import { PromptService } from "../services";
import { Prompt } from "types";

const promptService: PromptService = new PromptService()
const upload = multer()
export const promptRouter: Router = Router()

promptRouter.post('/', async (req: Request, res: Response) => {
  const userId = req.token?.id

  const p = await promptService.create(userId)
  res.status(200).send({
    p
  })
})

promptRouter.post('/create', upload.none(), async (req: Request, res: Response) => {
  const userId = req.token?.id
  const { promptId, role, message } = req.body

  const p = await promptService.createPrompt({
    userId, promptId: parseInt(promptId), role, message
  })

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