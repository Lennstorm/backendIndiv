import nedb from "nedb-promises";

const campaignDatabase = new nedb({ filename: "campaigns.db", autoload: true });

async function createCampaign(campaign) {
    try {        
        const newCampaign = await campaignDatabase.insert({
            products: campaign.products,
            packagePrice: campaign.packagePrice,
        });
        return newCampaign;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllCampaigns() {
    try {
        return await campaignDatabase.find({});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getCampaignById(id) {
    try {
        return await campaignDatabase.findOne({ _id: id });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateCampaign(id, updatedCampaign) {
    try {
        return await campaignDatabase.update(
            { _id: id },
            { $set: { products: updatedCampaign.products, packagePrice: updatedCampaign.packagePrice } }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteCampaign(id) {
    try {
        return await campaignDatabase.remove({ _id: id });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
};