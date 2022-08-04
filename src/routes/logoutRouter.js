import { Router } from 'express';

import logoutController from '../controllers/logoutController';

const router = Router();

router.get('/', logoutController.logout);

export default router;
