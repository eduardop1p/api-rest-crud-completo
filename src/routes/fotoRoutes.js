import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import fotoController from '../controllers/fotoController';

const router = Router();

// router.get('/', fotoController.index);
router.post('/:id', loginRequired, fotoController.store);
router.get('/:id', loginRequired, fotoController.show);
router.put('/:id', loginRequired, fotoController.update);
router.delete('/:id', loginRequired, fotoController.delete);

export default router;
