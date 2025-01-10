const fs = require("fs");

module.exports = (data) => {
  try {
    fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(data));
  } catch (error) {
    console.log("Dosya okunurken hata oldu", error);
  }
};
