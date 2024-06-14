import nedb from "nedb-promises";

// skapa kampanjdatabas om den inte redan finns
const campaignDatabase = new nedb({ filename: "campaigns.db", autoload: true });

// funktion för att skapa ny kampanj
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

// Funktion för att hämta alla kampanjer
async function getAllCampaigns() {
    try {
        return await campaignDatabase.find({});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Funktion som hämtar specifik kampanj
async function getCampaignById(id) {
    try {
        return await campaignDatabase.findOne({ _id: id });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Funktion för att uppdatera kampanj med id
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

// Funktion för att radera kampanj
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