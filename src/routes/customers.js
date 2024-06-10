// routes/customers.js
import { Router } from "express";
import { validateCustomer } from "../middleware/customersValidation.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customersController.js";
import { preventGuest } from "../middleware/preventGuest.js";
import { allowAdmin } from "../middleware/allowAdmin.js";

const router = Router();

// URL för CRUD-operationer: localhost:3000/api/customers

// POST-route för att lägga till ny kund
router.post("/", validateCustomer, createCustomerController);

// GET-route för admin att hämta alla kunder. Inklusive allowAdmin - kontroll för att bara tillåta admin.
router.get("/", allowAdmin, bodyContentBlocker, getAllCustomersController);
 

// GET-route för kund-profil
router.get("/profile", bodyContentBlocker, getCustomerByIdController);

// PUT-route för att uppdatera kund-info
router.put("/", preventGuest, validateCustomer, updateCustomerController);

// DELETE-route för att radera kund
router.delete("/", preventGuest, bodyContentBlocker, deleteCustomerController);

export default router;
