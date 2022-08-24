import nodemailer from 'nodemailer';

class NodemailerConfig {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mflixapp9@gmail.com',
        pass: process.env.EMAIL_PASSWORD_SERVICE,
      },
    });
  }

  async sendEmailRecoveryPassword(id, email) {
    await this.transport.sendMail({
      from: 'mflixapp@zohomail.com',
      subject: 'Recuperar senha de login MFLIX.',
      to: email,
      html: `
        <div style="background-color: #171A23; font-family: Trebuchet MS, sans-serif; margin: 0; padding: 0; box-sizing: border-box;">
        <h1 style="color: #fff; padding: 1rem 2rem 0rem; font-size: 2rem; font-weight: 500;">MFLIX</h1>
        <div style="padding: 2rem;">
          <div style="background-color: #fff; width: 100%; padding-bottom: 3rem; border-radius: 5px;">
            <img width="100%" style="margin: 0 auto;" src="https://res.cloudinary.com/ds1hwcaah/image/upload/v1661160966/images/mflix-email-recuperar-senha.png.png" alt="password images">
            <h1 style="max-width: 18rem; text-align: center; color: #171A23; font-size: 1.8rem; font-weight: 700; margin: 0 auto;" >ESQUECEU SUA SENHA?</h1>
            <h4 style="max-width: 17rem; text-align: center; color: #171A23; font-weight: 400; font-size: 14px; margin: 15px auto 0;">Não se preocupe, você pode escolher uma nova senha clicando no botão abaixo!</h4>
            <button style="border: none; margin: 2.5rem auto 0; display: block;"><a style="background-color: #B243F7; border-radius: 2rem; text-decoration: none; padding: 13px 1.8rem; color: #fff; font-size: 13px; font-weight: 500;" target="_blank" href="http://localhost:3000/recuperar-senha/${id}">NOVA SENHA</a></button>
          </div>
        </div>
      </div>
      `,
    });
  }
}

export default new NodemailerConfig();
