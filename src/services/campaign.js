import nedb from "nedb-promises";

const campaignDatabase = new nedb({ filename: "campaigns.db", autoload: true });

async function createCampaignService(newCampaign) {
    try {
        const createdCampaign = await campaignDatabase.insert(newCampaign);
        return createdCampaign;
    } catch (error) {
        throw new Error("Internt serverfel");
    }
}

async function getAllCampaignsService() {
    try {
        const campaigns = await campaignDatabase.find({});
        return campaigns;
    } catch (error) {
        throw new Error("Internt serverfel");
    }
}

async function updateCampaignService(id, updatedCampaign) {
    try {
        const campaign = await campaignDatabase.findOne({ _id: id });
        if (!campaign) {
            throw new Error("Kampanjen hittas inte!");
        }
        await campaignDatabase.update({ _id: id }, { $set: updatedCampaign });
        return updatedCampaign;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteCampaignService(id) {
    try {
        const numRemoved = await campaignDatabase.remove({ _id: id });
        if (numRemoved === 0) {
            throw new Error("Kampanjen hittas inte!");
        }
        return "Kampanjen raderad!";
    } catch (error) {
        throw new Error("Internt serverfel");
    }
}

export {
    createCampaignService,
    getAllCampaignsService,
    updateCampaignService,
    deleteCampaignService
};
