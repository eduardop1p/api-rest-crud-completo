import { Router } from 'express';

import recuperarSenhaControler from '../controllers/recuperarSenhaControler';

const router = Router();

router.post('/', recuperarSenhaControler.userExist);
router.put('/:id', recuperarSenhaControler.updatePasswordUser);

export default router;
