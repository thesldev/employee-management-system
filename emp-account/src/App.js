import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Home,
  Jobs,
  Leave,
  Notes,
  Profile,
  Login,
  PendingLeaves,
  CheckedLeaves,
} from './pages';

function App() {
  // Check if the user is authenticated by looking for a valid token in local storage
  const isLoggedIn = localStorage.getItem("employeeInfo") !== null;

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Use the <Navigate /> component to redirect unauthenticated users */}
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/jobs"
            element={isLoggedIn ? <Jobs /> : <Navigate to="/login" />}
          />
          <Route
            path="/leaves"
            element={isLoggedIn ? <Leave /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes"
            element={isLoggedIn ? <Notes /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/pending-leaves"
            element={isLoggedIn ? <PendingLeaves /> : <Navigate to="/login" />}
          />
          <Route
            path="/checked-leaves"
            element={isLoggedIn ? <CheckedLeaves /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
