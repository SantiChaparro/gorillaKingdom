const paymentsmock = require('../mockups/payments.json');
const { newPayment, addActivityToUser } = require('../controllers/masterControllers');

const paymentloader = async () => {
  const payments = paymentsmock.payments.map((item) => {
    return {
      dni: item.dni,
      fecha_pago: item.fecha_pago,
      monto: item.monto,
      medio_pago: item.medio_pago,
      activityIds: item.activityIds
    };
  });

  for (const payment of payments) {
    try {
      console.log(typeof payment.dni);

      // Crear el nuevo pago
      await newPayment(parseInt(payment.dni), payment.fecha_pago, payment.monto, payment.medio_pago, payment.activityIds);
      console.log(`Pago generado para DNI ${payment.dni}`);

      // Si hay actividades asociadas, añadirlas al usuario
      if (payment.activityIds.length > 0) {
        for (const id of payment.activityIds) {
          await addActivityToUser(payment.dni, id);
          console.log(`Actividad ${id} añadida para DNI ${payment.dni}`);
        }
      }

    } catch (error) {
      console.error(`Error generando pago para DNI ${payment.dni}:`, error.message);
    }
  }

  return payments;
};

module.exports = paymentloader;
