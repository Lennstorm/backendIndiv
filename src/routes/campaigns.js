import express from "express";
import { allowAdmin } from "../../src/middleware/allowAdmin.js";
import { validateCampProds } from "../middleware/validateCampProds.js";
import { createCampaign, getAllCampaigns, updateCampaign, deleteCampaign } from "../services/campaign.js";

const router = express.Router()

// POST ny kampanj ***** -- ENDAST ADMIN -- *****
router.post("/", allowAdmin, validateCampProds, async (req, res) => {
    const newCampaign = req.body;
    try {
        const createdCampaign = await createCampaign(newCampaign);
        res.status(201).json({ message: "Kampanjen har skapats" });
    }   catch (error) {
        res.status(500).json({ message: "Internt serverfel" });
    }
});

// GET alla kampanjer
router.get("/", async (req,res) => {
    try {
        const campaigns = await getAllCampaigns();
        res.status(200).json(campaigns);
    }   catch (error) {
        res.status(500).json({ message: "Internt serverfel" });
    }
});

// PUT uppdatera kampanj ***** -- ENDAST ADMIN -- *****
router.put("/:id", allowAdmin, validateCampProds, async (req, res) => {
    const id = req.params.id;
    const updatedCampaign = req.body;
    try {
        await updateCampaign(id, updatedCampaign);
        res.json({ message: "Kampanjen uppdaterad!"});
    }   catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: "Kampanjen hittas inte!" });
        } else {
            res.status(500).json({ message: "Internt serverfel"})
        }
    }
});

// DELETE kampanj ***** -- ENDAST ADMIN -- *****
router.delete("/:id", allowAdmin, async (req, res) => {
    const id = req.params.id;
    try {
        await deleteCampaign(id);
        res.json({ message: "Kampanjen raderad!"});
    }   catch(error) {
        if (error.status === 404) {
            res.status(404).json({ message: "Kampanjen hittas inte!"});
        }   else {
            res.status(500).json({ message: "Internt serverfel"})
        }
    }
});

export default router;