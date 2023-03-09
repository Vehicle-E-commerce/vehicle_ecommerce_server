import nodemailer from 'nodemailer';
import hbs from "nodemailer-express-handlebars"
import "dotenv/config"
import path from 'path';

export const sendPasswordResetEmail = async (email: string, token: string) => {
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
    //     user: process.env.EMAIL_EMAIL,
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

    transport.sendMail(mailOptions, (err, info) => {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
};
