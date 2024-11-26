import {create} from 'zustand';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useUsersStore = create((set) => ({
    users: [],
    searchedUser: [],
   
    fetchUsers: async () => {
        try {
            const users = await axios.get('http://localhost:3001/master/findUsers');
            console.log(users.data);
            set({ users: users.data });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },

    getUserById: async(dni) => {
        console.log('dni desde store',dni);
        try {
            const response = await axios.get(`http://localhost:3001/master/findUsers/${dni}`)
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
        console.log(values);
        try {
            const newUser = await axios.post('http://localhost:3001/master',values)
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
            const updatedUser = await axios.patch(`http://localhost:3001/master/updateUser/${dni}`,{values})
            console.log(updatedUser);
            return updatedUser
        } catch (error) {
            console.log(error);
        }
    },

    getUserByName: async(name)=> {

        try {
            const response = await axios.get(`http://localhost:3001/master/findUsers?name=${name}`);
            set({ searchedUser: response.data });
        } catch (error) {
            
        }
    }
}));


