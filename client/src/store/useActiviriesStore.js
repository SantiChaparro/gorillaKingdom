import {create} from 'zustand';
import axios from 'axios';

export const useActivitiesStore = create((set) => ({
    activities: [],
    userActivities:[],

    fetchActivities: async() => {

        const activities = await axios.get('http://localhost:3001/master/allActivities');
        console.log(activities);
        set({activities: activities.data});
    },

    newActivity: async(nombre,costo) => {
        const response = await axios.post('http://localhost:3001/master/createExercise',{nombre,costo});
        console.log(response.data)
        return response.data
    },

    addActivity: async(dni,activityId) => {
        const response = await axios.post(`http://localhost:3001/master/addSctivityByUserId/${dni}`,{activityId});
        console.log(response.data)
        return response.data
    },

    fetchUserActivities: async(dni) => {
        const response = await axios.get(`http://localhost:3001/master/currentUserActivities/${dni}`);
        console.log(response.data)
        set({userActivities: response.data});
        return response.data
    },

    deleteUserActivity: async(dni,activityId) => {
        const response = await axios.patch(`http://localhost:3001/master/removeUserActivity/${dni}`,{ ActivityId: activityId });
        console.log(response.data)
        return response.data
    },

    cleanUserActivities: async() => {
     
        set({userActivities:[]});
       
    }
    
    
    
}));