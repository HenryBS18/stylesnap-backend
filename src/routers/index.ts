import { authMiddleware } from "../middlewares";
import { authRouter } from "./auth.router";
import { clothesRouter } from "./clothes.router";
import { outfitRouter } from "./outfit.router";
import { Router } from "express";

export const router: Router = Router()

router.use('/', authRouter)
router.use('/clothes', authMiddleware, clothesRouter)
router.use('/outfit', authMiddleware, outfitRouter)