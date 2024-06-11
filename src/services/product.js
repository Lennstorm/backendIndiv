import nedb from "nedb-promises";

const database = new nedb({ filename: "product.db", autoload: true });

const defaultProducts = [
  {
    title: "Bryggkaffe",
    desc: "Bryggt på månadens bönor.",
    price: 39,
  },
  {
    title: "Caffè Doppio",
    desc: "En underbar dubbel espresso!",
    price: 49,
  },
  {
    title: "Cappuccino",
    desc: "Med härligt skummande mjölk.",
    price: 49,
  },
  {
    title: "Latte Macchiato",
    desc: "Skummande mjölkig, med en touch av espresso.",
    price: 49,
  },
  {
    title: "Kaffe Latte",
    desc: "Len och värmande god.",
    price: 54,
  },
  {
    title: "Cortado",
    desc: "Eldig spansk härta-härta.",
    price: 39,
  },
];

function formatDate(date) {
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);

  const year = localDate.getFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(localDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Add new menu item
async function createProduct(product) {
  try {
    const currentTime = formatDate(new Date());
    const newProduct = { ...product, createdAt: currentTime};
    const createdProduct = await database.insert(newProduct);
    console.log(createProduct);
  } catch (error) {
    console.error(error);
  }
}

// Get all menu items
async function getAllProducts() {
  try {
    const products = await database.find({});
    return products;
  } catch (error) {
    console.error(error);
  }
}

// Get specific menu item
async function getProductById(id) {
  try {
    return await database.findOne({ _id: id });
  } catch (error) {
    console.error(error);
  }
}

// Update menu item
async function updateProduct(id, updatedProduct) {
  try {
    const product = await database.findOne({ _id: id });

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    const currentTime = formatDate(new Date());
    const prodToUpdate = { ...updatedProduct, modifiedAt: currentTime };

    const result = await database.update(
      { _id: product._id },
      { $set: prodToUpdate }
    );

    console.log(`${product.title} has been updated`);
    return result;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught by the route handler
  }
}

// Delete menu item
async function deleteProduct(id) {
  try {
    const deletedProduct = await database.remove({ _id: id });

    if (deletedProduct === 0) {
      // Throw a 404 error if no document was deleted
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    console.log(id);
    console.log(deletedProduct);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught in the route handler
  }
}

// Initialize database with default data if empty
async function initializeDatabase() {
  try {
    const count = await database.count({});
    if (count === 0) {
      for (const product of defaultProducts) {
        await createProduct(product);
      }
      console.log("Default products inserted.");
    }
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  initializeDatabase,
};
