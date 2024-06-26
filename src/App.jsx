import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import AddService from "./pages/AddService";
import Service from "./pages/Services";
import Collaborators from "./pages/Collaborators";
import Extract from "./pages/Extract";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard />}
        />
        <Route
          exact
          path="/add-service"
          element={<AddService />}
        />
        <Route
          exact
          path="/service"
          element={<Service />}
        />
        <Route
          exact
          path="/collaborators"
          element={<Collaborators />}
        />
        <Route
          exact
          path="/extract"
          element={<Extract />}
        />
      </Routes>
    </>
  );
}

export default App;
