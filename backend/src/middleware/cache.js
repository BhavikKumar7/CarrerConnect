import redis from "../config/redis.js";

export const cache = (key) => {
  return async (req, res, next) => {
    try {
      const data = await redis.get(key);
      if (data) {
        return res.status(200).json({
          fromCache: true,
          data: JSON.parse(data),
        });
      }
      next();
    } catch (err) {
      next();
    }
  };
};