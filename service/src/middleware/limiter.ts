import { rateLimit } from 'express-rate-limit'
import { isNotEmptyString } from '../utils/is'

const MAX_REQUEST_PER_HOUR = process.env.MAX_REQUEST_PER_HOUR

const maxCount = (isNotEmptyString(MAX_REQUEST_PER_HOUR) && !isNaN(Number(MAX_REQUEST_PER_HOUR)))
  ? parseInt(MAX_REQUEST_PER_HOUR)
  : 0 // 0 means unlimited

// 限制
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Maximum number of accesses within an hour 每小时访问数量
  max: maxCount, // 最大值
  statusCode: 200, // 200 means success，but the message is 'Too many request from this IP in 1 hour'
  message: async (req, res) => {
    res.send({ status: 'Fail', message: 'Too many request from this IP in 1 hour', data: null })
  },
})

export { limiter }
