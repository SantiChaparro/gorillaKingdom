const { UserActivities, Activity, PaymentActivities } = require('../db.js'); // Asegúrate de importar los modelos necesarios
//const dayjs = require('dayjs');

const PaymentVerificationController = async () => {
  try {
    // Obtener todas las actividades pagadas a través de UserActivities -> PaymentActivities
    const actividadesPagadas = await UserActivities.findAll({
      where: { isPaid: true }, // Verificar actividades que ya están marcadas como pagadas
      include: [
        {
          model: Activity, // Incluimos el modelo Activity
          as: 'activity',
          include: [
            {
              model: PaymentActivities, // Vincular PaymentActivities para acceder a la fecha de vencimiento
              as: 'paymentActivities',
              attributes: ['fechaVencimiento'], // Solo necesitamos la fecha de vencimiento
            },
          ],
        },
      ],
    });

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Array para almacenar los IDs de las actividades vencidas
    const actividadesAVencer = [];

    // Revisar cada actividad pagada
    for (const actividad of actividadesPagadas) {
      if (actividad.activity.paymentActivities.length > 0) {
        const fechaVencimiento = actividad.activity.paymentActivities[0].fechaVencimiento;

        // Comparar la fecha de vencimiento con la fecha actual
        if (fechaActual > new Date(fechaVencimiento)) {
          actividadesAVencer.push(actividad.id); // Agregar el ID de la actividad vencida al array
        }
      }
    }

    // Si hay actividades vencidas, actualizar su estado
    if (actividadesAVencer.length > 0) {
      await UserActivities.update(
        { isPaid: false }, // Actualizar isPaid a false
        { where: { id: actividadesAVencer } } // Aplicar el update solo a los IDs vencidos
      );
      console.log(`${actividadesAVencer.length} actividades vencidas actualizadas correctamente.`);
    } else {
      console.log('No hay actividades vencidas.');
    }
  } catch (error) {
    console.error('Error al verificar las actividades pagadas:', error);
  }
};

module.exports = {PaymentVerificationController};
