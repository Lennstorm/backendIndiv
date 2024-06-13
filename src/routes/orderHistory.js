import express from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
} from "../controllers/orderHistoryController.js";
import { preventGuest } from "../middleware/preventGuest.js";
import { allowAdmin } from "../middleware/allowAdmin.js";

const router = express.Router();

// URL för CRUD-operationer: localhost:3000/api/order-history

// GET-route för alla order histories, inkludive allowAdmin - middleware för ADMIN-kontroll.
router.get("/all", allowAdmin, bodyContentBlocker, getAllOrderHistoriesHandler);

// GET-route för order history
router.get("/", preventGuest, bodyContentBlocker, getOrderHistory);

export default router;
