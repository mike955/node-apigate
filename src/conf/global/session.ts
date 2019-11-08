export const sessionRedisConfig = {
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  db: 0
};

export const sessionTTL = 1 * 60 * 60; // one hour

export const CipherivAlgorithm = "aes-256-cbc";

export const CipherivKey = "051f791db00011802cbda23ea43fc829"; // 256 / 8 =32

export const CipherivIV = "bea47265e562495b"; // 8
