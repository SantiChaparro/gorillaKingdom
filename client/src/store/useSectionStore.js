import {create} from 'zustand';
import axios from 'axios';

export const useSectionStore = create((set) => ({
    sections: [],

    postSection: async(formData) => {

        try {
            const section = await axios.post('http://localhost:3001/master/newSection',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Deja que el navegador maneje el boundary de multipart
                  },
            });
            console.log(section);
           
            return section.data;
        } catch (error) {
            console.log({error:error.messagge,error})
        }
       
    },

    getSections: async() => {

        try {
            const section = await axios.get('http://localhost:3001/master/allSections')
            set({sections:section.data})
        } catch (error) {
            console.log(error)
        }

    },

   
    
}));

/* addPost: async (formData) => {
        try {
          const response = await axios.post('http://localhost:3001/master/newPost', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Deja que el navegador maneje el boundary de multipart
            },
          });
    
          if (response.data) {

            return response.data;
          }
        } catch (error) {
          console.log('Error al subir el post:', error);
        }
      }, */