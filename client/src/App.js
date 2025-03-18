import './App.css';
import React, { useState,useRef } from 'react';
import {  Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import UserDashBoard from './Pages/users/allUsers/UserDashBoard';
import UserRoutine from './Pages/users/allUsers/UserRoutine';
import UserDrawer from './Components/UserDrawe';
import Dashboard from './Pages/dashboard/Dashboard';
import MasterDrawer from './Components/searchBar/MasterDrawer';
import NewUserForm from './Pages/users/newUserForm/NewUserForm';
import EditUsers from './Pages/users/allUsers/editUsers';
import CreateRoutine from './Pages/routines/createRoutine/CreateRoutine';
import CreateExercise from './Pages/create-exercise/CreateExercise';
import UpdateRoutine from './Pages/routines/updateRoutine/UpdateRoutine';
import Posts from './Pages/posts/Posts';
import Settings from './Pages/settings/Settings';
import UserNavBar from './Components/UserNavBar';
import Payments from './Pages/payments/Payments';
import AllPayments from './Pages/payments/AllPayments';
import CreateActivity from './Pages/activities/CreateActivity';
import UpdateActivity from './Pages/activities/UpdateActivity';
import { useLocation } from 'react-router-dom';
import Features from './Pages/features/Features';
import Onboarding from './Pages/OnBoarding';
import Subscriptions from './Pages/subscriptions/Subscriptions';
import { useLogginStore } from './store/useLogginStore';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';




function App() {
  const [opendrawer, setOpenDrawer] = useState(false);//drawer de usuario
   const [openDrawer, setOpendrawer] = useState(false);//drawer de la landing
  const [openMasterdrawere , setOpenMasterdrawer] = useState(false);
  const [verifiedUser , setVerifiedUser] = useState("");
  const [openLandingDrawer, setOpenLandingDrawer] = useState(false);
  const [userTenants, setUserTenants] = useState([]);
   const [selectedTenants, setSelectedTenants] = useState(userTenants.length === 1 ? userTenants[0].id : '');
   const {setLoggin} = useLogginStore();
     
      
  console.log(verifiedUser);
  console.log('array de tenants',userTenants);
  console.log('tenant elegido',selectedTenants);
  console.log(openLandingDrawer);
  const refForm = useRef(null);
  
  
  const handleClick = () => {
          const token = Cookies.get('token');
          if (token) {
              const decodedToken = jwtDecode(token);
              console.log(decodedToken);
              
              if (decodedToken.rol === "Master") {
                  navigate("/master"); // Redirige al dashboard de Master
              } else {
                  navigate("/usuario"); // Redirige al dashboard de Usuario
              }
          } else {
              // Si no hay token, mostrar el formulario de login
              setOpendrawer(false);
              setLoggin(true);
          }
      };
  
  const menuItems = [
    { label: 'Inicio', onClick: () => console.log('Inicio') },
    { label: 'Sobre Nosotros', onClick: () => console.log('Sobre Nosotros') },
    { label: 'Precios', onClick: () => console.log('Precios') },
    { label: 'Registrarse', onClick: () => {navigateToOnBoarding()} },
    { label: 'Iniciar Sesión', onClick: () => handleClick() },
];
 
    const navigate = useNavigate();

const navigateToOnBoarding = () => {
  navigate('/onboarding');
};

  const handleMenuClick = () => {
    setOpenDrawer(true);
  };

  const closeUserDrawer  = () => {
    setOpenDrawer(false);
  };

  const closeMasterdrawer = () =>{
    setOpenMasterdrawer(false);
  }

  const handleMasterDrawer = () => {
    setOpenMasterdrawer(true)

  };

  const hanldeCloseDrawer = () => {
    setOpenLandingDrawer(false)
};
//cierre drawer de la landing
const closeDrawer = () => {
  setOpendrawer(false);    
};

 



  return (
    <div>
       <Routes>
        <Route path="/" element={<Landing ref ={refForm} verifiedUser={verifiedUser} setVerifiedUser={setVerifiedUser} setOpenLandingDrawer={setOpenLandingDrawer} hanldeCloseDrawer={hanldeCloseDrawer} openLandingDrawer={openLandingDrawer}setOpendrawer={setOpendrawer}openDrawer={openDrawer}closeDrawer={closeDrawer}/>} />
        <Route path="/features" element={<Features ref={refForm} verifiedUser={verifiedUser} setVerifiedUser={setVerifiedUser} setOpendrawer={setOpendrawer}closeDrawer={closeDrawer}openDrawer={openDrawer} menuItems={menuItems} />} />
        <Route path="/onboarding" element={<Onboarding/>}/>
        <Route
          path="/master"
          element={<Dashboard />}
        />
        <Route
          path="/usuario"
          element={<UserDashBoard verifiedUser={verifiedUser} setVerifiedUser={setVerifiedUser} selectedTenants={selectedTenants} setSelectedTenants={setSelectedTenants} userTenants={userTenants} setUserTenants={setUserTenants} />}
        />
        <Route
          path="/usuario-rutina"
          element={<UserRoutine verifiedUser={verifiedUser} selectedTenants={selectedTenants}/>}
        />
         <Route
        path='/master/crear-rutina'
        element={<CreateRoutine/>}
        />
          <Route
        path='/master/editar-rutina'
        element={<UpdateRoutine/>}
        />
        <Route
        path='/master/registro-usuario'
        element={<NewUserForm/>}
        />
        <Route
        path='/master/editar-usuario'
        element={<EditUsers/>}
        />
         <Route
        path='/master/crear-ejercicio'
        element={<CreateExercise/>}
        />
        <Route
        path='/master/crear-actividad'
        element={<CreateActivity/>}
        />
        <Route
        path='/master/editar-actividad'
        element={<UpdateActivity/>}
        />
         <Route
        path='/master/posts'
        element={<Posts/>}
        />
          <Route
        path='/master/settings'
        element={<Settings/>}
        />
          <Route
        path='/master/payments'
        element={<Payments/>}
        />
          <Route
        path='/master/all-payments'
        element={<AllPayments/>}
        />
       <Route
        path='/master/subscriptions'
        element={<Subscriptions/>}
       />
        <Route path="/success" element={<Landing/>} />
        <Route path="/pending" element={<Landing/>} />
      </Routes>
      <UserDrawer open={opendrawer} onClose={closeUserDrawer }setVerifiedUser={setVerifiedUser} />
      <MasterDrawer open={openMasterdrawere} onClose={closeMasterdrawer} setVerifiedUser={setVerifiedUser}/>
      <AppContent handleMenuClick={handleMenuClick} handleMasterDrawer={handleMasterDrawer} />

    </div>
     
  );

  function AppContent({ handleMenuClick, handleMasterDrawer }) {
    const location = useLocation();
    const shouldRenderNavBar = ['/master', '/usuario'].some(path => location.pathname.includes(path));
  
    return shouldRenderNavBar ? (
      <UserNavBar handleMenuClick={handleMenuClick} handleMasterDrawer={handleMasterDrawer} />
    ) : null;
  }
}

export default App;
