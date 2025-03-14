const apiUrl = process.env.NODE_ENV === 'development'
   ? process.env.REACT_APP_LOCAL_URL
   : process.env.REACT_APP_RENDER_URL;

   console.log('AQUI DEBERIAS VER EL ENTORNO EN EL QUE SE ESTA TRABAJANDO',process.env.NODE_ENV);
   

export default apiUrl;