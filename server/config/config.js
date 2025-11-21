// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
// src/config/config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,

  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/job_portal"
};
