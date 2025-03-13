import {create} from 'zustand';
import axios from 'axios';
import apiUrl from './config';

export const usePaymentsStore = create((set) => ({
    payments: [],
   // userActivities:[],

    fetchPayments: async(filters) => {

        const payments = await axios.get(`${apiUrl}/master/payment`,{params:filters});
        set({payments: payments.data});
        return payments
    },

    fetchAllPayments: async(tenantId) => {
        console.log('tenantId desde paymentstore',tenantId);
        
        const payments = await axios.get(`${apiUrl}/master/payment`,{params:{tenantId}});
        set({payments: payments.data});
        return payments
    }

}));