import {create} from 'zustand';
import axios from 'axios';

export const useRoutinesStore = create((set) => ({
    routines: [],

    postRoutine: async(routineObj) => {

       try {
        const routine = await axios.post('http://localhost:3001/master/routine',{ routineObj });
        console.log('desde store',routine.data)
       } catch (error) {
        console.log({error,error:error.message});
       }


    },
    


}));