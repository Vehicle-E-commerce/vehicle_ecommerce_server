import nodemailer from 'nodemailer';
import "dotenv/config"

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2287c39c5fccc7",
          pass: "a08532b3e84eb1"
        }
      });
    // const transport = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });
    

    const url = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
      from: `${process.env.EMAIL_USERNAME} <${process.env.EMAIL_EMAIL}>`,
      to: email,
      subject: 'Password Reset Request',
      text: "Este e-mail foi solicitado para trocar sua senha de acesso ao Vehicle Ecommerce",
      html: `<p>Clique no link a seguir para redefinir sua senha:</p><p><a href="${url}">${url}</a></p>`,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
