import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { FormProvider } from "./context"; // Ensure the correct import path

const App = () => {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/:tab?" element={<Dashboard />} />
        </Routes>
      </FormProvider>
    </Router>
  );
};

export default App;
