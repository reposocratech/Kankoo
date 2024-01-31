const nodemailer = require("nodemailer");

async function main(email, msg, asunto) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kankoo.app.validation@gmail.com",
      pass: "bzutoskmqqqwwxqc",
    },
  });

  const info = await transporter.sendMail({
    from: '"Aviso de verificación" <kankoo.app.validation@gmail.com>',
    to: email,
    subject: asunto,
    text: msg,
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = main;
