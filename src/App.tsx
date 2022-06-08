import { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './common/contexts/AuthContex';
import { ScreenSizeContext } from './common/contexts/ScreenSizeContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import DesktopUsers from './pages/users/desktop/DesktopUsers';
import DesktopDrivers from './pages/users/desktop/drivers/Drivers';
import MobileDrivers from './pages/users/mobile/drivers/Drivers';
import DesktopInspectors from './pages/users/desktop/inspectors/Inspectors';
import MobileInspectors from './pages/users/mobile/inspectors/Inspectors';
import MobileUsers from './pages/users/mobile/MobileUsers';
import RequireAuth from './routers/RequireAuth';
import DesktopCreateInspector from './pages/users/desktop/inspectors/create/CreateInspector';
import DesktopCreateAddress from './pages/addresses/desktop/create/CreateAddress';
import Addresses from './pages/addresses/Addresses';

function App() {
  const screen = useContext(ScreenSizeContext);

  const { admin } = useAuth();

  //gets screen size - to fix mobile viewport height problem
  useEffect(() => {
    function handleResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/addresses/create'
          element={
            screen.isMobile || screen.isTablet ? (
              <></>
            ) : (
              <RequireAuth>
                <DesktopCreateAddress />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/addresses'
          element={
            <RequireAuth>
              <Addresses />
            </RequireAuth>
          }
        />
        <Route
          path='/users/inspectors/create'
          element={
            screen.isMobile || screen.isTablet ? (
              <></>
            ) : (
              <RequireAuth>
                <DesktopCreateInspector />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/users/inspectors'
          element={
            screen.isMobile || screen.isTablet ? (
              <RequireAuth>
                <MobileInspectors />
              </RequireAuth>
            ) : (
              <RequireAuth>
                <DesktopInspectors />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/users/drivers'
          element={
            screen.isMobile || screen.isTablet ? (
              <RequireAuth>
                <MobileDrivers />
              </RequireAuth>
            ) : (
              <RequireAuth>
                <DesktopDrivers />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/users'
          element={
            screen.isMobile || screen.isTablet ? (
              <RequireAuth>
                <MobileUsers />
              </RequireAuth>
            ) : (
              <RequireAuth>
                <DesktopUsers />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/login'
          element={admin?.id ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/'
          element={admin?.id ? <Home /> : <Navigate to='/login' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
