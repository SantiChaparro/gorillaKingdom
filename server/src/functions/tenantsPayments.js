const { MercadoPagoConfig, Preference } = require('mercadopago'); // Importa MercadoPagoConfig y Preference
require('dotenv').config();

const { MERCADO_PAGO_ACCES_TOKEN,MERCADO_TEST_TOKEN } = process.env;

// Crear una nueva instancia de MercadoPagoConfig con el token de acceso
const client = new MercadoPagoConfig({
  accessToken: MERCADO_TEST_TOKEN, 
});

const tenantsPayments = async (preferencesArray) => {
  // Mapeamos los productos para generar los items de la preferencia
  const items = preferencesArray.map((item) => ({
    title: item.name,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  // Creamos una instancia de Preference
  const preference = new Preference(client);

  try {
    // Crear la preferencia con los items y las URLs de retorno
    const response = await preference.create({
      body: {
        items, // Asignamos los items que creamos antes
        back_urls: {
          success: "http://localhost:3000/success",  // URL de éxito
          failure: "http://localhost:3000/failure",  // URL de fallo
          pending: "http://localhost:3000/pending",  // URL de pendiente
        },
        auto_return: "approved", // Opción de auto-retorno
      },
    });

    // Aquí obtenemos la ID de la preferencia creada
    const init_point = response.init_point;
    console.log("Preferencia creada con éxito:", init_point);
    console.log(response);
    

    // Retornar la ID de la preferencia para usarla en el frontend
    return init_point;
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
  }
};

module.exports = { tenantsPayments };
