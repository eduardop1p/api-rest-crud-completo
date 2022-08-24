import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import fotoController from '../controllers/fotoController';

const router = Router();

// router.get('/', fotoController.index);
router.post('/:userId', loginRequired, fotoController.store);
// router.get('/:userId', loginRequired, fotoController.show);
// router.put('/:userId', loginRequired, fotoController.update);
router.delete('/:userId', loginRequired, fotoController.delete);

export default router;
