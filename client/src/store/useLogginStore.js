import { create } from 'zustand';
import axios from 'axios';

export const useLogginStore = create((set) => ({
    logginResponse: {
        user: null,
        token: null,
        successMessage: null,
        error: null,
    },
    LogginFormOpen: false,

    postLoggin: async (dni, password) => {
        try {
            const response = await axios.post('http://localhost:3001/loggin/postLoggin', { dni, password });
            
            console.log("Respuesta del servidor:", response.data);  // Verificar la respuesta

            // Actualizamos el estado logginResponse con los datos de la respuesta
           if(response.data.user){
            set({
                logginResponse: {
                    user: response.data.user,
                    token: response.data.token,
                    successMessage: response.data.message,
                    error: null, // Limpiamos cualquier error anterior
                },
                LogginFormOpen: false // Cerrar el formulario después de un logueo exitoso
            });
           }else{
            set({
                logginResponse: {
                    user: null,
                    token: null,
                    successMessage: null,
                    error: 'Usuario no encontrado',
                },
                LogginFormOpen: true // Mostrar el formulario si no se encuentra el usuario
            });
           }

            console.log("Estado después de actualizar:", response.data); // Verificar que se actualiza

        } catch (error) {
            console.error("Error al hacer el loggin:", error);

            // Actualizamos el estado para reflejar el error en caso de fallo
            set({
                logginResponse: {
                    user: null,
                    token: null,
                    successMessage: null,
                    error: 'Error al iniciar sesión',
                },
               // LogginFormOpen: true // Asegurarse de que el formulario permanezca abierto en caso de error
            });
        }
    },
    logout: () => set({
        logginResponse: {
            user: null,
            token: null,
            successMessage: null,
            error: null,
        },
       // LogginFormOpen: true // Abrir el formulario de login después de logout
    }),

    setLoggin: (value) => set({ LogginFormOpen: value }) // Método para abrir o cerrar el formulario de login
}));
