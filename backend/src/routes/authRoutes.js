import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { register, login, getMe, verifyOTP } from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { resendOTP } from "../controllers/otpController.js";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../config/redis.js";

const router = express.Router();

const loginLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
    }),
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Max 5 attempts
    message: {
        message: "Too many login attempts. Try again after 1 minute.",
    },
});

const otpLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
    }),
    windowMs: 30 * 1000, // 30 seconds
    max: 2, // Max 2 OTP resends
    message: {
        message: "OTP resend limit reached. Try again later.",
    },
});

// Add logout route
router.post("/logout", protect, async (req, res) => {
    try {
        const token = req.token;
        await redis.set(`blacklist:${token}`, 1, "EX", 3600);

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
    }
});

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", otpLimiter, resendOTP);
router.post("/login", loginLimiter, login);

router.get("/me", protect, getMe);

router.post(
    "/upload-image",
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    }
);

export default router;