import {create} from 'zustand';
import axios from 'axios';
import apiUrl from './config';

export const usePostStore = create((set) => ({
    posts: [],
    successMessage:"",

    addPost: async (formData) => {
        try {
          const response = await axios.post(`${apiUrl}/master/newPost`, formData, {
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
      },

  getPost: async() => {

    try {
        const response = await axios.get(`${apiUrl}/master/allPosts`);
        console.log(response.data);
        
        set({posts:response.data})
    } catch (error) {
        console.log('Error al obtener el post:', error);
    }

  },
    
}));