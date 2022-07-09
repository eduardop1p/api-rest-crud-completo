import RecuperarSenhaModel from '../models/recuperarSenhaModel';
import nodemailerConfig from '../config/nodemailerConfig';

class RecuperarSenhaControler {
  async userExist(req, res) {
    const recuperarSenha = new RecuperarSenhaModel(req.body);

    const user = await recuperarSenha.userExistModel();

    if (recuperarSenha.errors.length > 0)
      return res.json({ errors: recuperarSenha.errors });

    const { _id, email } = user;

    await nodemailerConfig.sendEmailNodemailer(_id, email);
    return res.json({
      recuperarSenha: [`Enviamos um email para ${email}`],
    });
  }

  async updatePasswordUser(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const recuperarSenha = new RecuperarSenhaModel(req.body);

    await recuperarSenha.updateUserPasswordModel(id);

    if (recuperarSenha.errors.length > 0)
      return res.json({ errors: recuperarSenha.errors });

    return res.json({
      recuperarSenha: ['Senha atualizada com sucesso.'],
    });
  }
}

export default new RecuperarSenhaControler();
