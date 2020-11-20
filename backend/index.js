const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(koaBody());
app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`koa server is working (port: ${PORT})... http://localhost:3000`);
});

/*router.post("/chats", async (ctx) => {
  try {
    console.log("ctx.request", ctx.request.body);
    // ctx.body = getChats(state.currentUser);
    // console.log("ctx.body", ctx.body);
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});*/