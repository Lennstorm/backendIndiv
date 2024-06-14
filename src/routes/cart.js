//routes/cart.js

import { Router } from "express";
import { getProductById } from "../services/product.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { getAllCampaignsService } from "../services/campaign.js";

const router = Router({ mergeParams: true });
const carts = {}; // Object to store carts for each customer

// Calculate total price of items in the cart
const calculateTotalPrice = async (cart) => {
  // let total = cart.reduce((sum, item) => sum + item.price, 0);  Den här fanns tidigare när vi hade mängdrabatt. Låter den ligga kvar tills vidare.

  let total = 0;  
  const campaigns = await getAllCampaignsService();

  // Kopia av cart för att inte fucka med originalcart  
  const cartCopy = [...cart];

  //Gå igenom alla kampanjer för att leta matchningar
  for (const campaign of campaigns) {
    const campaignProducts = campaign.products.map(productId => cartCopy.find(item => item._id === productId));
    if (campaignProducts.every(product => product)) {
      total += campaign.packagePrice;
      // se till att kampanjprodukters pris inte läggs till igen
      campaignProducts.forEach(product => {
        product.isCampaignProduct = true;
      });
    }
  }

  total += cartCopy.reduce((sum, item) => item.isCampaignProduct ? sum : sum + item.price, 0);

  return total;
};

  //   if (cart.length >= 5) {
  //     total *= 0.8;
  //   } else if (cart.length >= 3) {
  //     total *= 0.9;
  //   }
  //   return total;

// Find or create cart
const getCart = (customerId) => {
  if (!carts[customerId]) {
    carts[customerId] = [];
  }
  return carts[customerId];
};

// GET cart
router.get("/", bodyContentBlocker, async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const cart = getCart(customerId);

  if (cart.length === 0) {
    return res.json({
      message: "Din varukorg är tom",
    });
  }

  try {
    const totalPrice = await calculateTotalPrice(cart);
    console.log(totalPrice);
  
    res.status(200).json({
      success: true,
      status: 200,
      data: {
        cart,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
});

//POST add product to cart
router.post("/:productId", bodyContentBlocker, async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const productId = req.params.productId;
  try {
    const foundItem = await getProductById(productId);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Produkten du försöker lägga till existerar inte.",
      });
    }

    const cart = getCart(customerId);
    cart.push(foundItem);

    const totalPrice = await calculateTotalPrice(cart);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Produkt tillagd i varukorgen",
      data: {
        cart,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
});

//DELETE delete product from cart
router.delete("/:productId", bodyContentBlocker, async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const productId = req.params.productId;
  const cart = getCart(customerId);
  const foundItemIndex = cart.findIndex((item) => item._id === productId);

  if (foundItemIndex === -1) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Produkten du försöker ta bort finns inte i varukorgen",
    });
  }

  cart.splice(foundItemIndex, 1);

  const totalPrice = await calculateTotalPrice(cart);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Produkt borttagen från varukorgen",
    data: {
      cart,
      totalPrice,
    },
  });
});

export default router;
export { getCart, calculateTotalPrice }; // Ensure getCart is exported
