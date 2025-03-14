import {create} from 'zustand';
import axios from 'axios';
import apiUrl from '../configUrl';

export const useActivitiesStore = create((set) => ({
    activities: [],
    userActivities:[],

    fetchActivities: async(TenantId) => {

        const activities = await axios.get(`${apiUrl}/master/allActivities`,{params:{TenantId}});
        console.log(activities);
        set({activities: activities.data});
    },


    newActivity: async(nombre,costo,descripcion,tenantId) => {
        const response = await axios.post(`${apiUrl}/master/newActivity`,{nombre,costo,descripcion,tenantId},{params:{Tenantid:tenantId}});
        console.log(response.data)
        return response.data
    },

    addActivity: async(dni,activityId) => {
        const response = await axios.post(`${apiUrl}/master/addSctivityByUserId/${dni}`,{activityId});
        console.log(response.data)
        return response.data
    },

    fetchUserActivities: async(dni,tenantId) => {
        const response = await axios.get(`${apiUrl}/master/currentUserActivities/${dni}`,{params:{Tenantid:tenantId}});
        console.log(response.data)
        set({userActivities: response.data});
        return response.data
    },

    deleteUserActivity: async(dni,activityId) => {
        const response = await axios.patch(`${apiUrl}/removeUserActivity/${dni}`,{ ActivityId: activityId });
        console.log(response.data)
        return response.data
    },

    cleanUserActivities: async() => {
     
        set({userActivities:[]});
       
    }
    
    
    
}));