import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';
import Features from './Pages/features/Features';



function App() {
  const [opendrawer, setOpenDrawer] = useState(false);
  const [openMasterdrawere , setOpenMasterdrawer] = useState(false);
  const [verifiedUser , setVerifiedUser] = useState("");
  const [openLandingDrawer, setOpenLandingDrawer] = useState(false);
  console.log(verifiedUser);
  

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing verifiedUser={verifiedUser} setVerifiedUser={setVerifiedUser} setOpenLandingDrawer={setOpenLandingDrawer} hanldeCloseDrawer={hanldeCloseDrawer} openLandingDrawer={openLandingDrawer} />} />
        <Route path="/features" element={<Features />} />
        <Route
          path="/master"
          element={<Dashboard />}
        />
        <Route
          path="/usuario"
          element={<UserDashBoard verifiedUser={verifiedUser} setVerifiedUser={setVerifiedUser}/>}
        />
        <Route
          path="/usuario-rutina"
          element={<UserRoutine verifiedUser={verifiedUser}/>}
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
      </Routes>
      <UserDrawer open={opendrawer} onClose={closeUserDrawer }setVerifiedUser={setVerifiedUser} />
      <MasterDrawer open={openMasterdrawere} onClose={closeMasterdrawer} setVerifiedUser={setVerifiedUser}/>
      <AppContent handleMenuClick={handleMenuClick} handleMasterDrawer={handleMasterDrawer} />
    </Router>
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
