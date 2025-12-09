// config/redis.js
import { createClient } from "redis";
const REDIS_URL = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || 6379}`;

export const redisClient = createClient({
  url: process.env.REDIS_URL || REDIS_URL,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on("error", (e) => console.error("Redis error", e));
redisClient.on("connect", () => console.log("Redis connecting..."));
export const connectRedis = async () => {
  if (!redisClient.isOpen) await redisClient.connect();
  console.log("Redis connected");
  return redisClient;
};
