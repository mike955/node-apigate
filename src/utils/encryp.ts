import * as crypto from "crypto";
import {CipherivAlgorithm, CipherivKey, CipherivIV} from '../conf/global/session';

export default class Encryp {
  constructor() {}

  static CipherivSession(data) {
    // const key = crypto.randomBytes(16).toString('hex')
    // const iv = crypto.randomBytes(8).toString('hex');
    const key = CipherivKey;
    const iv = CipherivIV;
    let sign = "";
    const cipher = crypto.createCipheriv(CipherivAlgorithm, key, iv);
    sign += cipher.update(data, "utf8", "hex");
    sign += cipher.final("hex");
    return sign;
  }

  static DecipherivSession(data) {
    const key = CipherivKey;
    const iv = CipherivIV;
    try {
      const decipher = crypto.createDecipheriv(CipherivAlgorithm, key, iv);
      let decrypted = decipher.update(data, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch (error) {
      return false;
    }
  }
}
