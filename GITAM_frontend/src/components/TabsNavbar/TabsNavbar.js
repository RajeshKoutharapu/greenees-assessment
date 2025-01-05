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
        onClick={() => onTabChange('tab1')}
      >
        Tab 1
      </button>
      <button
        className={currentTab === 'tab2' ? 'active' : ''}
        onClick={() => onTabChange('tab2')}
      >
        Tab 2
      </button>
      <button
        className={currentTab === 'tab3' ? 'active' : ''}
        onClick={() => onTabChange('tab3')}
      >
        Tab 3
      </button>
      <button
        className={currentTab === 'tab4' ? 'active' : ''}
        onClick={() => onTabChange('tab4')}
      >
        Tab 4
      </button>
      <button
        className={currentTab === 'tab5' ? 'active' : ''}
        onClick={() => onTabChange('tab5')}
      >
        Tab 5
      </button>
    </div>
  );
};

export default TabsNavbar;
