const express = require("express");
const app = express();
const port = 4001;
const cors = require("cors");

// bütün route yapısının olduğu routerı çektik
const recipteRouter = require("./routes/recipeRoutes");

// cors hatalarını önleyenn middleware-otoheaderlar ekler
app.use(cors());

// bodydeki json verilerini okumak için
app.use(express.json());

// server a tarifle alakalı routeları tanıttık
app.use(recipteRouter);

// server da dinlenecek portu belirle
app.listen(port, () => {
  console.log(`server ${port} portunu dinliyor`);
});
