import {create} from 'zustand';
import axios from 'axios';

export const useSubscriptionsStore = create((set) => ({
    subscriptions: [],
    successMessage:"",

    addSubscription: async (duration, discount, tenantId) => {
        console.log('duration',duration);
        console.log('discount',discount);
        console.log('tenantId',tenantId);
        
        try {
          const response = await axios.post('http://localhost:3001/master/newSubscription', {duration, discount}, {
            params:{tenantId},
            headers: {
              'Content-Type': 'application/json', // Deja que el navegador maneje el boundary de multipart
            },
          });
    
          if (response.data) {

           return response.data;
           
          }
        } catch (error) {
          console.log('Error crear la subscripcion:', error);
        }
      },

  getAllSubscriptions: async(tenantId) => {

    try {
        const response = await axios.get('http://localhost:3001/master/allSubscriptions',{params:{tenantId}});
        console.log(response.data);
        
        set({subscriptions:response.data})
    } catch (error) {
        console.log('Error al obtener las subscripciones:', error);
    }

  },

  modifySubscriptions: async(subscriptionId,updateData,tenantId) => {
    console.log('updateData desde store',updateData);
    console.log('subscriptionId desde store',subscriptionId);
    console.log('tenantId desde store',tenantId
    );
    
    

    try {
        const response = await axios.patch(`http://localhost:3001/master/updateSubscription/${subscriptionId}`,updateData,{params:{tenantId}});
        console.log(response.data);
        
       return response.data;
    } catch (error) {
        console.log('Error al modificar la subscripcion:', error);
    }

  },
    
}));