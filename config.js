module.exports = {
  MONGO_URI:
    process.env.DATABASE_URL ||
    "mongodb+srv://gm-admin:goalMogulDevMongoInstance@goalmogul-primary-g7hk0.mongodb.net/goalmogul-dev?retryWrites=true&w=majority",
  TOKEN_SECRET:
    process.env.TOKEN_SECRET || "thequickbrownfoxjumpsoverthelazydog",
  // serverURL: "https://www.goalmogul.com/",
  PORT: process.env.PORT,
  // MONGO_URI: "",
  // baseURL: "http://localhost:3000/#/",
  // serverURL: "http://localhost:8081/",

  baseURL:
    process.env.baseURL || "https://goalmogul-affiliate.herokuapp.com/#/",
  serverURL:
    process.env.serverURL || "https://goalmogul-affiliate.herokuapp.com/",
};
