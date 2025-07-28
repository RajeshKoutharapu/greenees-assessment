import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormContext } from '../../allContexts/context';  // ✅ Import useFormContext


import Tab1 from '../tabs/tab1/tab1';
import Tab2 from '../tabs/tab2/tab2';
import Tab3 from '../tabs/tab3/tab3';
import Tab4 from '../tabs/tab4/tab4';
import Tab5 from '../tabs/tab5/tab5';
import './Dashboard.css';
import TabsNavbar from '../TabsNavbar/TabsNavbar';

const Dashboard = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || 'tab1';

  //const { formData, setFormData } = useFormContext();  // ✅ Use Form Context
  //console.log("Dashboard formData:", formData); // Debugging log

  const renderTabContent = () => {
    switch (currentTab) {
      case 'Title_Preparations':
        return <Tab1 />;
      case 'IntstrumentsExperiments':
        return <Tab2 />;
      case 'Chemicals_Reagents_Solvents_Gas':
        return <Tab3 />;
      case 'General':
        return <Tab4 />;
      case 'FinalReport':
        return <Tab5 />;
      default:
        return <Tab1 />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Tabs Navbar */}
      <TabsNavbar />

      {/* Tab content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
