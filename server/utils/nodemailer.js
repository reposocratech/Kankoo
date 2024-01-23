const nodemailer = require("nodemailer");

async function main() {
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
    from: '"Aviso de verificación" <kankoo.app.validation@gmail.com>', // sender address
    to: "kankoo.app.validation@gmail.com", // list of receivers
    subject: "Nueva guía por verificar ✔", // Subject line
    text: "Hay una nueva guía por verificar", // plain text body
    html: "<b>Entra en tu cuenta antes de que pase mucho tiempo y el guía se duerma en los laureles 😪😉 Confirma que está todo correcto para que los usuarios puedan disfrutar cuanto antes de su guía ✈️</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = main();
