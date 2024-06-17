import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Rooms from './components/rooms';
import Login from './components/login'; // Import your Login component
import './App.css';

// This function checks if the user is authenticated
const isAuthenticated = () => {
  // Replace this with your actual logic
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated() ? children : null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Rooms />} />
        <Route path="/*" element={<Rooms />} />
        {/* <Route path="/" element={<PrivateRoute><Rooms /></PrivateRoute>} />
        <Route path="/*" element={<PrivateRoute><Rooms /></PrivateRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;