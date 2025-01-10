// utils de okuma işlemleri yapıldı, tarifler dataya aktarıldı
const getData = require("../utils/getData");
const crypto = require("crypto");
// utilsde yazma işlemi yapıldı
const setData = require("../utils/setData");

const data = getData();

exports.getAllRecipes = (req, res) => {
  // tariflerin kopyasını oluştur kullanmak için
  let recipes = [...data];

  // küçük harf duyarlılığını ortadan kaldırdık
  const search = req.query?.search?.toLowerCase();
  // arama yapıldıysa search parametresi eklendiyse filtrele
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  // order parametresi varsa sırala
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  // bütün tarifler
  res.status(200).json({
    message: "Bütün tarifler alındı",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  // dizide param ile gelen id'li tarifi ara
  const found = data.find((i) => i.id === req.params.id);

  // tarif bulunmazsa hata gönder
  if (!found) {
    res.status(404).json({ message: "Aradağınız eleman bulunamadı" });
  }

  // cevap gönder
  res.status(200).json({ message: "Aranılan tarif bulundu", recipe: found });
};

exports.deleteRecipe = (req, res) => {
  //silinecek elemanınn sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);
  //elemanı diziden kaldır
  data.splice(index, 1);

  //json dosyasını güncelle
  setData(data);

  res.status(204).json({ message: "Bu tarif silindi" });
};

exports.createRecipe = (req, res) => {
  const newRecipe = req.body;

  // (1) Verinin bütün alanlarının dolu olup olmadığını kontrol et
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: "Lütfen tüm değerleri girin" });
  }

  // (2) Veriye benzersiz bir id ekle
  newRecipe.id = crypto.randomUUID();

  // (3) Yeni tarifi veri dizisine ekle
  data.push(newRecipe);

  // (4) Güncel veriyi dosyaya yaz
  setData(data);

  // (5) Başarılı yanıt dön
  res
    .status(201)
    .json({ message: "Yeni tarif oluşturuldu", recipe: newRecipe });
};
