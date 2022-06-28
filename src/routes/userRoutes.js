import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userController from '../controllers/userController';

const router = Router();

router.get('/', userController.index);
router.post('/', userController.store);
router.put('/:id', loginRequired, userController.update);
router.get('/:id', loginRequired, userController.show);
router.delete('/:id', loginRequired, userController.delete);

export default router;
