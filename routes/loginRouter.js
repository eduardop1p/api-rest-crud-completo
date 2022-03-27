import { Router } from 'express';

import loginController from '../controllers/loginController';

const router = Router();

router.post('/', loginController.login);

export default router;
