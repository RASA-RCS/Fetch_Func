// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
// src/config/db.js
const mongoose = require("mongoose");
const { mongoURI } = require("./config");

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
