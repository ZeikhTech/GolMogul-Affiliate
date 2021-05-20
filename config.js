module.exports = {
  MONGO_URI:
    process.env.DATABASE_URL ||
    "mongodb+srv://gm-admin:goalMogulDevMongoInstance@goalmogul-primary-g7hk0.mongodb.net/goalmogul-dev?retryWrites=true&w=majority",
  TOKEN_SECRET:
    process.env.TOKEN_SECRET ||
    "20049616b76d1275f138ce76851fa6b94215ced73f2e96f8933742ca6a4a13b21796faa934cda7d71790c9f743beec0a3fb6b0e96435ec8430d40e4cf4948144",
  // serverURL: "https://www.goalmogul.com/",
  PORT: process.env.PORT || 8080,
  // MONGO_URI: "",
  // baseURL: "http://localhost:3000/#/",
  // serverURL: "http://localhost:8081/",

  baseURL:
    process.env.baseURL || "https://goalmogul-affiliate.herokuapp.com/#/",
  serverURL:
    process.env.serverURL || "https://goalmogul-affiliate.herokuapp.com/",
};
