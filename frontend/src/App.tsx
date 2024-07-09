import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import FreeRooms from './pages/Rooms/availableRooms';
import OccupiedRooms from './pages/Rooms/occupiedRooms';
import AllRooms from './pages/Rooms/allRooms';
import Report from './pages/report/report';
import SplashPage from './pages/splash';
import { RootState } from './redux/store';


const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.signIn);

  if (!token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthRoute = pathname === '/' || pathname === '/auth/signin';

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Kal Palace" />
              <SplashPage />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
      </Routes>
      {!isAuthRoute && (
        <DefaultLayout>
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="eComm" />
                    <ECommerce />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/receptionist/dashboard"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Receptionist Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    {/* Your Receptionist Dashboard Component */}
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Calendar />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormLayout />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Report | Kal Palace" />
                    <Report />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Settings />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/chart"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Chart />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Alerts />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Buttons />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <SignUp />
                </>
              }
            />
            <Route
              path="/all-rooms"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Rooms | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <AllRooms />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/free-rooms"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Free Rooms | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FreeRooms />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/occupied-rooms"
              element={
                <PrivateRoute>
                  <>
                    <PageTitle title="Occupied Rooms | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <OccupiedRooms />
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
``