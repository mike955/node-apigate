import * as Koa from 'koa';
import router from './route';
import * as bodyParser from 'koa-bodyparser';
import * as http from 'http';

const app = new Koa();


app.keys = ["node","apigate","cookie"];

app
  .use(bodyParser({
    enableTypes: ['json', 'form'],
    encode: 'utf-8',
    formLimit: '512m',
  }))
  .use(router.routes())
  .use(router.allowedMethods())

http.createServer(app.callback()).listen(9201, () => {
  console.log('server start 9201')
});