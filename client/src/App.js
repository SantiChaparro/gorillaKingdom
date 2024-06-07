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

function App() {
  const [opendrawer, setOpenDrawer] = useState(false);
  const [openMasterdrawere , setOpenMasterdrawer] = useState(false);

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/master"
          element={<Dashboard handleMasterDrawer={handleMasterDrawer} onClose={closeMasterdrawer} openMasterdrawere={openMasterdrawere}/>}
        />
        <Route
          path="/usuario"
          element={<UserDashBoard handleMenuClick={handleMenuClick} onClose={closeUserDrawer } opendrawer={opendrawer} />}
        />
        <Route
          path="/rutina-usuario"
          element={<UserRoutine handleMenuClick={handleMenuClick} />}
        />
        <Route
        path='/registro-usuario'
        element={<NewUserForm/>}
        />
        <Route
        path='/editar-usuario'
        element={<EditUsers/>}
        />
      </Routes>
      <UserDrawer open={opendrawer} onClose={closeUserDrawer } />
      <MasterDrawer open={openMasterdrawere} onClose={closeMasterdrawer}/>
    </Router>
  );
}

export default App;
