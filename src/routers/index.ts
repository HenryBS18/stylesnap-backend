import { Router } from "express";
import { authMiddleware } from "../middlewares";

import { authRouter } from "./auth.router";
import { clothesRouter } from "./clothes.router";
import { outfitRouter } from "./outfit.router";
import { collectionRouter } from "./collection.router";

export const router: Router = Router()

router.use('/', authRouter)
router.use('/clothes', authMiddleware, clothesRouter)
router.use('/outfit', authMiddleware, outfitRouter)
router.use('/collection', authMiddleware, collectionRouter)