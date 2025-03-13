const apiUrl = process.env.REACT_APP_NODE_ENV === 'development'
   ? process.env.REACT_APP_LOCAL_URL
   : process.env.REACT_APP_RENDER_URL;

export default apiUrl;