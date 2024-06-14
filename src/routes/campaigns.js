//routes/campaigns.js

import express from "express";
import { allowAdmin } from "../middleware/allowAdmin.js";
import { validateCampProds } from "../middleware/validateCampProds.js";
import {
    createCampaignController,
    getAllCampaignsController,
    updateCampaignController,
    deleteCampaignController
} from "../controllers/campaignController.js";

const router = express.Router();

// POST ny kampanj  -- ENDAST ADMIN -- 
router.post("/", allowAdmin, validateCampProds, createCampaignController);

// GET alla kampanjer
router.get("/", getAllCampaignsController);

// PUT uppdatera kampanj  -- ENDAST ADMIN -- 
router.put("/:id", allowAdmin, validateCampProds, updateCampaignController);

// DELETE kampanj  -- ENDAST ADMIN -- 
router.delete("/:id", allowAdmin, deleteCampaignController);

export default router;
