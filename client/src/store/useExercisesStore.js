import {create} from 'zustand';
import axios from 'axios';

export const useExercisesStore = create((set) => ({
    exercises: [],

    fetchExercises: async(TenantId) => {

        const exercises = await axios.get('http://localhost:3001/master/findExercises',{params:{TenantId}});
        console.log(exercises);
        set({exercises: exercises.data});
    },

    newExercise: async(nombre,grupo_muscular,descripcion,TenantId) => {
        const response = await axios.post('http://localhost:3001/master/createExercise',{nombre,grupo_muscular,descripcion},{params:{TenantId}});
        console.log(response.data)
        return response.data
    },
    
    
}));