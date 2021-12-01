import Router from '@koa/router';
import * as controllers from 'src/controllers';
import { ApiError } from 'src/error';

const router = new Router();

router.post('/rest/post', controllers.postPrompt);

router.get('/rest/health', controllers.getHealth);

router.all('(.*)', async (): Promise<void> => {
	throw new ApiError('Not found', 404);
});

export default router;
