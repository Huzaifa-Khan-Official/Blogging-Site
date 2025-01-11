import { rateLimit } from 'express-rate-limit'

export const rateLimiter = (time, limit, message) => {
    return rateLimit({
        windowMs: time,
        limit,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        message,
        keyGenerator: (req, res) => req.user._id
    })
}