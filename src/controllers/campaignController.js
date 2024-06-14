//controllers/campaignController.js

import {
    createCampaignService,
    getAllCampaignsService,
    updateCampaignService,
    deleteCampaignService
} from "../services/campaign.js";

export async function createCampaignController(req, res) {
    const newCampaign = req.body;
    try {
        const createdCampaign = await createCampaignService(newCampaign);
        res.status(201).json({ message: "Kampanjen har skapats", data: createdCampaign });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllCampaignsController(req, res) {
    try {
        const campaigns = await getAllCampaignsService();
        if (campaigns.length === 0) {
            return res.status(200).json({ message: "Inga kampanjer finns för tillfället." });
        }
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateCampaignController(req, res) {
    const id = req.params.id;
    const updatedCampaign = req.body;
    try {
        const updatedData = await updateCampaignService(id, updatedCampaign);
        res.status(200).json({ message: "Kampanjen uppdaterad!", data: updatedData });
    } catch (error) {
        res.status(error.message === "Kampanjen hittas inte!" ? 404 : 500).json({ message: error.message });
    }
}

export async function deleteCampaignController(req, res) {
    const id = req.params.id;
    try {
        const message = await deleteCampaignService(id);
        res.status(200).json({ message });
    } catch (error) {
        res.status(error.message === "Kampanjen hittas inte!" ? 404 : 500).json({ message: error.message });
    }
}
