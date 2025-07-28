import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TabsNavbar.css'; 

const TabsNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'tab1';

  // Function to change the tab
  const onTabChange = (tab) => {
    navigate(`/dashboard/${tab}`);
  };

  return (
    <div className="tabs-navbar">
      <button
        className={currentTab === 'tab1' ? 'active' : ''}
        onClick={() => onTabChange('Title_Preparations')}
      >
        Title & Preparations
      </button>
      <button
        className={currentTab === 'tab2' ? 'active' : ''}
        onClick={() => onTabChange('IntstrumentsExperiments')}
      >
Instruments/Equipments
      </button>
      <button
        className={currentTab === 'tab3' ? 'active' : ''}
        onClick={() => onTabChange('Chemicals_Reagents_Solvents_Gas')}
      >
Chemicals/Reagents/Solvents/Gas
      </button>
      <button
        className={currentTab === 'tab4' ? 'active' : ''}
        onClick={() => onTabChange('General')}
      >
General
      </button>
      <button
        className={currentTab === 'tab5' ? 'active' : ''}
        onClick={() => onTabChange('FinalReport')}
      >
Final Report
      </button>
    </div>
  );
};

export default TabsNavbar;
