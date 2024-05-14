import {create} from 'zustand';
import axios from 'axios';

export const useRoutinesStore = create((set) => ({
    routines: [],
    succesMessage: "",
    errorMessage: "",

    postRoutine: async(routineObj) => {
        console.log(routineObj);
       try {
        console.log('desde store',routineObj);
        const routine = await axios.post('http://localhost:3001/master/routine', {routineObj} );
        console.log('desde store',routine.data)
        set({succesMessage:routine.data.successMessage});
        return routine.data
       } catch (error) {
        set({errorMessage:error.message})
        console.log({error,error:error.message});
       }


    },

    emptyMessages: () => {
        set({succesMessage:"",errorMessage:""})
    },
    


}));