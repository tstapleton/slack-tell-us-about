import Koa from 'koa';
import errorHandler from 'src/middleware/error-handler';
import requestLogger from 'src/middleware/request-logger';
import router from 'src/middleware/router';

const app = new Koa();

app.use(errorHandler());
app.use(requestLogger());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
