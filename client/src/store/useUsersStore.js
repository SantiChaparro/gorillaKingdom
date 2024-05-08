import {create} from 'zustand';
import axios from 'axios';

export const useUsersStore = create((set) => ({
    users: [],
    fetchUsers: async () => {
        try {
            const users = await axios.get('http://localhost:3001/master/findUsers');
            console.log(users.data);
            set({ users: users.data });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
    postUser: async(values) => {
        console.log(values);
        try {
            const newUser = await axios.post('http://localhost:3001/master',values)
            console.log(newUser);
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
    }
}));

