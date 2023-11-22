import React, { useEffect, useState } from 'react'; // Import useState to use state variables
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { 
  Analytics, 
  Orders, 
  Calendar, 
  ActiveEmployees, 
  Kanban,  
  Editor , 
  EmployeeRegistration, 
  EmployeeProfile, 
  EmployeeLeave,
  FilesHandelings,
  LineChartComponent,
  PieChart,
  BarChart,
  JobApplication,
  Job_application_history
} from './pages';


import { useStateContext } from './contexts/ContextProvider';

import './App.css';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar/>
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar/>
            </div>
          )}
          <div className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }>
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                
              </div>
            <div>

            {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                 <Route path="/" element={(<Analytics />)} />
                  <Route path="/Analytics" element={(<Analytics />)} />

                  {/* pages  */}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<ActiveEmployees />} />
                  <Route path="/Employee-Leaves" element={<EmployeeLeave />} />

                  {/* apps  */}
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/files" element ={<FilesHandelings />} />
                
                {/* charts */}
                <Route path="/line" element={<LineChartComponent />} />
                <Route path="/pie" element={<PieChart />} />
                <Route path="/bar" element={<BarChart />} />

                {/* links */}
                <Route path="/Employee-Registration" element={<EmployeeRegistration />} />
                <Route path="/employee/:AccountID" element={<EmployeeProfile/>} />
                <Route path="/Job-Application" element={<JobApplication />} />
                <Route path="/job-application-history" element={<Job_application_history/>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
