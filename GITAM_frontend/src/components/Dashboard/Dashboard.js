import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  // State for Tab1 data
  const [standardsRows, setStandardsRows] = useState(0);
  const [resolutionsRows, setResolutionsRows] = useState(0);
  const [samplesRows, setSamplesRows] = useState(0);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'tab1':
        return (
          <Tab1 
            standardsRows={standardsRows} 
            setStandardsRows={setStandardsRows} 
            resolutionsRows={resolutionsRows} 
            setResolutionsRows={setResolutionsRows} 
            samplesRows={samplesRows} 
            setSamplesRows={setSamplesRows} 
          />
        );
      case 'tab2':
        return <Tab2 />;
      case 'tab3':
        return <Tab3 />;
      case 'tab4':
        return <Tab4 />;
      case 'tab5':
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
