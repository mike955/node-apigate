import * as Redis from "ioredis";
import { sessionRedisConfig, sessionTTL } from "../conf/global/session";

const redis = new Redis(sessionRedisConfig);
export default class RedisStore {
  constructor() {}

  static async get(sid) {
    return await redis.get(sid);
  }

  static async set(sid, data, ttl?) {
    return await redis.setex(sid, ttl || sessionTTL, data);
  }

  static async destroy(sid) {
    return await redis.del(sid);
  }
}
