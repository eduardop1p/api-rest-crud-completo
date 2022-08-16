import { Router } from 'express';

import recuperarSenhaControler from '../controllers/recuperarSenhaControler';

const router = Router();

router.post('/', recuperarSenhaControler.userExistEmail);
router.get('/:id', recuperarSenhaControler.userExistId);
router.put('/:id', recuperarSenhaControler.updatePasswordUser);

export default router;
