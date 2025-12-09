// middlewares/cache.js
import { redisClient } from "../config/redis.js";
const DEFAULT_TTL = parseInt(process.env.CACHE_TTL || "60", 10);

function getCacheKey(req) {
  const base = req.originalUrl || req.url;
  // If your route returns user-specific content, include req.user.id here
  return `cache:${base}`;
}

export const cacheMiddleware = (ttl = DEFAULT_TTL) => {
  return async (req, res, next) => {
    if (req.method !== "GET") return next();
    try {
      const key = getCacheKey(req);
      const cached = await redisClient.get(key);
      if (cached) {
        const payload = JSON.parse(cached);
        return res.status(200).json({ fromCache: true, ...payload });
      }
      const origJson = res.json.bind(res);
      res.json = async (body) => {
        try {
          await redisClient.setEx(key, ttl, JSON.stringify(body));
        } catch (e) {
          console.warn("Redis set failed", e);
        }
        return origJson(body);
      };
      next();
    } catch (e) {
      console.error("Cache middleware error", e);
      next();
    }
  };
};

export const delCache = async (key) => {
  try { return await redisClient.del(key); } catch (e) { console.error(e); }
};

export const delCacheByPrefix = async (prefix) => {
  let deleted = 0;
  try {
    const iter = redisClient.scanIterator({ MATCH: `${prefix}*`, COUNT: 200 });
    for await (const k of iter) {
      await redisClient.del(k);
      deleted++;
    }
  } catch (e) {
    console.error("delCacheByPrefix error", e);
  }
  return deleted;
};
