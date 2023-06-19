import Koa from 'koa';
import {koaBody} from 'koa-body';
import routes from './routes/routes.js';
import render from 'koa-ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = new Koa();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'layout/template',
    viewExt: 'html',
    cache: false,
    debug: true
});

// app.use(async function (ctx) {
//     await ctx.render('user');
// });
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
