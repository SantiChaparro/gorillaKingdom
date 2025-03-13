import {create} from 'zustand';
import axios from 'axios';
import apiUrl from './config';

export const useExercisesStore = create((set) => ({
    exercises: [],

    fetchExercises: async(TenantId) => {

        const exercises = await axios.get(`${apiUrl}/master/findExercises`,{params:{TenantId}});
        console.log(exercises);
        set({exercises: exercises.data});
    },

    newExercise: async(nombre,grupo_muscular,descripcion,TenantId) => {
        const response = await axios.post(`${apiUrl}/master/createExercise`,{nombre,grupo_muscular,descripcion},{params:{TenantId}});
        console.log(response.data)
        return response.data
    },
    
    
}));