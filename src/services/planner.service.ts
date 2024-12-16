import { Planner } from "../types";
import { PlannerRepo } from "../repositories";


const plannerRepo: PlannerRepo = new PlannerRepo()

export class PlannerService {
  public async createNewPlanner(planner: Planner): Promise<Planner> {
    return await plannerRepo.create(planner)
  }

  public async getAllPlannerByUserId(userId: number): Promise<Planner[]> {
    return await plannerRepo.findAllByUserId(userId)
  }

  public async deletePlannerById(id: number): Promise<void> {
    await plannerRepo.deleteById(id)
  }
}