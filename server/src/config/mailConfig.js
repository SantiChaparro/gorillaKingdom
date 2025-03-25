const nodemailer = require('nodemailer');

// Crea el transporte (configuración de nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Usando el servicio de Gmail
  auth: {
    user: 'gympallfit@gmail.com',  // Tu correo de la app
    pass: 'jcma igto wgie fsgv',  // Contraseña de la app de Gmail
  },
});

// Función para enviar un correo de bienvenida
const sendTenantWelcomeEmail = async (toEmail) => {
  const mailOptions = {
    from: 'gympallfit@gmail.com',  // Tu correo de la app
    to: toEmail,  // Correo del usuario
    subject: 'Bienvenido a GymPall',
    text: 'Gracias por registrarte en GymPall. ¡Nos alegra tenerte con nosotros!',
  };

  try {
        console.log(`Enviando correo de bienvenida a: ${toEmail}`);
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        
        return info.response;
    } catch (err) {
        return console.error('Error al enviar correo de bienvenida:', err);
    }
};

const sendUsertWelcomeEmail = async (toEmail,tenantName) => {
    const mailOptions = {
      from: 'gympallfit@gmail.com',  // Tu correo de la app
      to: toEmail,  // Correo del usuario
      subject: `Bienvenido a ${tenantName}`,
      text: `Gracias por ser parte de ${tenantName}. ¡Nos alegra tenerte con nosotros!`,
    };
  
    try {
          const info = await transporter.sendMail(mailOptions);
          return info.response;
      } catch (err) {
          return console.error('Error al enviar correo de bienvenida:', err);
      }
  }

// Función para enviar un correo de confirmación de pago
const sendPaymentConfirmationEmail = async (toEmail) => {
  const mailOptions = {
    from: 'gympallfit@gmail.com',
    to: toEmail,
    subject: 'Confirmación de Pago',
    text: '¡Tu pago ha sido confirmado con éxito! Gracias por usar nuestros servicios.',
  };

  try {
        const info = await transporter.sendMail(mailOptions);
        return console.log('Correo de confirmación de pago enviado:', info.response);
    } catch (err) {
        return console.error('Error al enviar correo de confirmación de pago:', err);
    }
};

// Exportar las funciones para ser usadas en otros archivos
module.exports = {
    sendTenantWelcomeEmail,
  sendPaymentConfirmationEmail,
  sendUsertWelcomeEmail
};
