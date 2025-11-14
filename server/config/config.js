// src/config/config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,

  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/job_portal"
};
