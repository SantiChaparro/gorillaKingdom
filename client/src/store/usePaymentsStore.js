import {create} from 'zustand';
import axios from 'axios';

export const usePaymentsStore = create((set) => ({
    payments: [],
   // userActivities:[],

    fetchPayments: async(filters) => {

        const payments = await axios.get('http://localhost:3001/master/payment',{params:filters});
        set({payments: payments.data});
        return payments
    },

    fetchAllPayments: async() => {

        const payments = await axios.get('http://localhost:3001/master/payment');
        set({payments: payments.data});
        return payments
    }

}));