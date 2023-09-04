/*En este service se encuentran todas 
las funciones necesarias para mandar un email desde la api*/

const nodemailer = require('nodemailer');
require('dotenv').config()

  async function sendEmail(data) {
    try {
      const jConfig = {
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
    };
      const transporter = nodemailer.createTransport(jConfig);
  
      const info = await transporter.sendMail({...data,from:jConfig.auth.user});
      return info.response;
    } catch (error) {
      console.log(error);
      throw new Error('Error al enviar el correo electrónico');
    }
  }

  module.exports = {
    sendEmail,
  }