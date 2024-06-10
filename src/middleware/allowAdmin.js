import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

//Tillåt bara admin att göra vissa operationer

export async function allowAdmin(req, res, next) {
    try {
        const loggedInCustomer = await findLoggedInCustomer();

        if (!loggedInCustomer || !loggedInCustomer.admin) {
            return res.status(403).json({
                message: "Only Admin can execute this operation",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "An error ocurred while checking admin status"
        });
    }
}