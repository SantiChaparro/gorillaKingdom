import {create} from 'zustand';
import axios from 'axios';

export const useRoutinesStore = create((set) => ({
    routines: [],
    succesMessage: "",
    errorMessage: "",

    postRoutine: async (routineObj) => {
      console.log(routineObj);
      try {
          console.log('desde store', routineObj);
          const routine = await axios.post('http://localhost:3001/master/routine', { routineObj });
          console.log('desde store routine.data', routine.data.successMessage)
          set({ succesMessage: routine.data.successMessage });
          return routine.data;
      } catch (error) {
          // Verificamos si hay una respuesta de error del backend
          if (error.response && error.response.data && error.response.data.error) {
              // Aquí accedemos al mensaje específico del error que proviene del backend

              set({ errorMessage: error.response.data.error });
          } else {
              // Si no hay un mensaje específico, mostramos el genérico
              set({ errorMessage: error.message });
          }
          console.log({ error, errorMessage: error.response ? error.response.data.error : error.message });
      }
  },

    emptyMessages: () => {
        set({succesMessage:"",errorMessage:""})
    },


    getRoutine: async(dni) => {

       try {
        const userroutine = await axios.get(`http://localhost:3001/user/routine/${dni}`);
        console.log('desde el store',userroutine.data);
        set({routines:userroutine.data})
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
          return response.data
        } catch (error) {
          set({ errorMessage: error.message });
          console.log({ error, error: error.message });
        }
      },

      masterUpdateRoutine: async (id,updateData) => {
        //const { id, updateData } = updatedRoutine;
        console.log('desde el store', id);
        try {
            const response = await axios.patch(`http://localhost:3001/master/updateRoutine/${id}`, { updateData });
            console.log('Routine updated successfully:', response.data);
            set({ succesMessage: response.data.successMessage });
            return response.data // agregue esto para que me devuelva y confirmar desde el front
        } catch (error) {
            set({ errorMessage: error.message });
            console.log({ error, error: error.message });
        }
    },

    removeExercise: async (routineId,exerciseId) => {

      try {
        const response = await axios.patch(`http://localhost:3001/master/routine/${routineId}/deleteExercise/${exerciseId}`)
        console.log('Routine updated successfully:', response.data);
        set({ succesMessage: response.data.successMessage });
      } catch (error) {
        set({ errorMessage: error.message });
        console.log({ error, error: error.message });
      }


    },

    addingNewExercise: async (routineId,addExercise) => {

      try {
        const response = await axios.patch(`http://localhost:3001/master/addExercise/${routineId}`,addExercise);
        set({ succesMessage: response.data.successMessage });
        return response.data
      } catch (error) {
        set({ errorMessage: error.message });
        console.log({ error, error: error.message });
      }

    },

    creatingNewDay: async (routineId,dayToAdd) => {
      console.log(dayToAdd.day);
      console.log(routineId);
      
      console.log(typeof dayToAdd);
      
      
      try {
        const response = await axios.post(`http://localhost:3001/master/addNewday/${routineId}`,dayToAdd);
        set({ succesMessage: response.data.successMessage });
      } catch (error) {
        set({ errorMessage: error.message });
        console.log({ error, error: error.message });
      }

    },

    deleteDay: async (routineId, data) => {
      console.log(routineId);
      console.log(data);
      
      try {
        const response = await axios.delete(`http://localhost:3001/master/removeDay/${routineId}`, { data });
        set({ successMessage: response.data.successMessage });
      } catch (error) {
        set({ errorMessage: error.message });
        console.log({ error, error: error.message });
      }
    },

      
  



}));