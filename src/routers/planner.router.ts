import { Router, Request, Response } from "express";
import { PlannerService } from "../services";
import { Planner } from "../types";
import multer from "multer";
import { dateParser } from "../utils/date-parser";

const plannerService: PlannerService = new PlannerService()
const upload = multer()
export const plannerRouter: Router = Router()

plannerRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.token?.id

    const planners: Planner[] = await plannerService.getAllPlannerByUserId(userId)

    res.status(200).send({
      data: [
        ...planners
      ]
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

plannerRouter.post('/', upload.none(), async (req: Request, res: Response) => {
  try {
    const userId = req.token?.id
    const { outfitId, date } = req.body

    const planner: Planner = await plannerService.createNewPlanner({
        userId, 
        outfitId: parseInt(outfitId), 
        date: dateParser(date)
    })

    res.status(200).send({
      planner
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

plannerRouter.delete('/', upload.none(), async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    await plannerService.deletePlannerById(parseInt(id))

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})