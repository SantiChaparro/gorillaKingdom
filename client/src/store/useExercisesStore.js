import {create} from 'zustand';
import axios from 'axios';

export const useExercisesStore = create((set) => ({
    exercises: [],

    fetchExercises: async() => {

        const exercises = await axios.get('http://localhost:3001/master/findExercises');
        console.log(exercises);
        set({exercises: exercises.data});
    }
    
    
}));