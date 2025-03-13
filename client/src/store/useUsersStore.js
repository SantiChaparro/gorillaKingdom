import {create} from 'zustand';
import axios from 'axios';
import Swal from 'sweetalert2';
import apiUrl from './config';

export const useUsersStore = create((set) => ({
    users: [],
    searchedUser: [],
   
    fetchUsers: async (tenantId) => {
        try {
            console.log("tenantId que se está enviando:", tenantId);
            const users = await axios.get(`${apiUrl}/master/findUsers`,{params:{tenantId}});
            console.log(users.data);
            set({ users: users.data });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },

    getUserById: async(dni,tenantId) => {
        console.log('dni desde store',dni);
        console.log('tenantid desde store',tenantId);
        try {
            const response = await axios.get(`${apiUrl}/master/findUsers/${dni}`,{params:{tenantId}});
            console.log('respuesta desde el store',response.data);
            set({searchedUser:response.data});
           
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(error.response);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario no encontrado',   
                });
            }
        }
    },

    clearSearchedUser: () => set({ searchedUser: [] }), // Método para limpiar el estado

    postUser: async(values) => {
        console.log('valores recibidos en el store',values);
        try {
            const newUser = await axios.post(`${apiUrl}/master`,values)
            console.log(newUser);
            return newUser
        } catch (error) {
            console.error(error);
        }
    },
    modifyUser: async (dni,values) => {
        console.log('valores desde el store',values);
        console.log('dni desde el store',dni)

        try {
            const updatedUser = await axios.patch(`${apiUrl}/master/updateUser/${dni}`,{values})
            console.log(updatedUser);
            return updatedUser
        } catch (error) {
            console.log(error);
        }
    },

    getUserByName: async(name,tenantId)=> {

        try {
            const response = await axios.get(`${apiUrl}/master/findUsers?name=${name}`,{params:{tenantId}});
            set({ searchedUser: response.data });
        } catch (error) {
            
        }
    }
}));


