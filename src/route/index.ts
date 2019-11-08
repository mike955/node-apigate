import * as Router from "koa-router";
import * as crypto from "crypto";
import * as cookie from "cookie";
import * as moment from "moment";
import { cookieOpt } from "../conf/global/cookie";
import RedisStore from "../utils/redis";
import Encryp from "../utils/encryp";

const router = new Router();

router
  .all("/test", ctx => {
    ctx.body = "hello word";
  })
  .post("/login", async ctx => {
    let request = ctx.request;
    let reqBody = request.body;
    if (reqBody.username !== "123456" || reqBody.password !== "123456") {
      throw new Error("username or password error");
    }
    // check res
    let loginRes = {
      username: "123456",
      uid: "123456789"
    };
    let token = crypto.randomBytes(16).toString("hex");
    let sessionData = {
      uid: loginRes.uid,
      username: loginRes.username,
      token,
      loginTime: moment().format("YYYY-MM-DD HH:mm:ss")
    };
    let cipherSessionData: any = Encryp.CipherivSession(
      JSON.stringify(sessionData)
    );
    let saveRedis = await RedisStore.set(loginRes.uid, cipherSessionData);
    if (saveRedis != "OK") throw new Error("save redis error");
    ctx.cookies.set("session", cipherSessionData, cookieOpt);
    ctx.set("token", token);
    ctx.body = "hello word";
  })
  .all("/api", async ctx => {
    const cookies = cookie.parse(ctx.request.header.cookie);
    const headers = ctx.request.headers;
    const session = cookies.session;
    if (session === undefined) throw new Error("use authentication failed");
    const decipherSessionData: any = Encryp.DecipherivSession(session);
    if (decipherSessionData === false)
      throw new Error("use authentication failed");
    const sessionData = JSON.parse(decipherSessionData);
    const redisData = await RedisStore.get(sessionData.uid);
    if (
      redisData === null ||
      redisData !== session ||
      headers["token"] == undefined ||
      headers["token"] !== sessionData["token"]
    )
      throw new Error("user error");
    ctx.body = "use authentication success";
  })
  .all("/logout", async ctx => {
    const cookies = cookie.parse(ctx.request.header.cookie);
    const session = cookies.session;
    if (session === undefined) throw new Error("use authentication failed");
    const decipherSessionData: any = Encryp.DecipherivSession(session);
    if (decipherSessionData === false)
      throw new Error("use authentication failed");
    const sessionData = JSON.parse(decipherSessionData);
    const redisData = await RedisStore.destroy(sessionData.uid);
    if (redisData === null) throw new Error("user error");
    ctx.body = "logout success";
  });

export default router;
