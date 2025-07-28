import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import { FormProvider } from './allContexts/context'; // Ensure correct path
//import { FormProvider as tab2 } from './allContexts/tab2Context'; // Ensure correct path



const App = () => {
    return (
        <Router>
            <FormProvider>  {/* ✅ Wrap entire Routes inside FormProvider */}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard/:tab?" element={<Dashboard />} />
                </Routes>
            </FormProvider>
        </Router>
    );
};

export default App;
