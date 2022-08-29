import { Router } from 'express';

import logoutController from '../controllers/logoutController';

const router = Router();

router.delete('/', logoutController.logout);

export default router;
