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
        console.log('desde store routine.data',routine.data)
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


    getRoutine: async(dni) => {

       try {
        const userroutine = await axios.get(`http://localhost:3001/user/routine/${dni}`);
        console.log('desde el store',userroutine);
        return userroutine.data;
       } catch (error) {
        set({errorMessage:error.message});
        console.log({error,error:error.message});
       }

    },
    
    modifyRoutine: async (updatedRoutine) => {
        console.log(updatedRoutine);
        const { id , updateData } = updatedRoutine;
        console.log('desde el store',updateData);
        try {
          const response = await axios.patch(`http://localhost:3001/user/updateRoutine/${id}`, {updateData} );
          console.log('Routine updated successfully:', response.data);
          set({ succesMessage: response.data.successMessage });
        } catch (error) {
          set({ errorMessage: error.message });
          console.log({ error, error: error.message });
        }
      }



}));