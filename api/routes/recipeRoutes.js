const express = require("express");
const {
  getAllRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
} = require("../controllers/recipeControllers");

// Router yapısı > server.js dosyası dışında route tanımı yapmamızı sağlar
const router = express.Router();

// router in endpointlerine istek gelince çalışacak fonksiyonları belirle
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);
router.route("/api/recipes/:id").get(getRecipe).delete(deleteRecipe);

// Server da bütün router yapısını kullanmak için export et
module.exports = router;
