import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Redis from "ioredis";

// Fix dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log("Redis connecting to:", process.env.REDIS_HOST, process.env.REDIS_PORT);

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME || undefined,
  password: process.env.REDIS_PASSWORD || undefined,
});

redis.on("connect", () => {
  console.log("✅ Connected to Local Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

export default redis;