// routes/admin.routes.js
import express from "express";
import { delCacheByPrefix } from "../middlewares/cache.js";
const router = express.Router();

router.post("/cache/clear", async (req, res) => {
  const { prefix = "cache:" } = req.body;
  try {
    const deleted = await delCacheByPrefix(prefix);
    return res.json({ success: true, deleted });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false });
  }
});

export default router;
