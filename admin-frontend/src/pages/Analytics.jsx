import React, { useState, useEffect } from 'react';
import { IoIosMore } from 'react-icons/io';
import welcomeBg from '../structure/hero-background.jpg';
import { IoPersonOutline, IoTimeOutline, IoAppsOutline, IoCheckmarkDoneOutline, IoAlertCircleOutline} from 'react-icons/io5';
import axios from 'axios';
import { Header } from '../components';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Button } from '../components'; 

import { useStateContext } from '../contexts/ContextProvider';

const Analytics = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [reasonData, setReasonData] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [pendingJobApplications, setPendingJobApplications] = useState(0);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/empLeave');
      const leaveStatusData = transformLeaveData(response.data);
      const reasonData = transformReasonData(response.data);
      setLeaveData(leaveStatusData);
      setReasonData(reasonData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/employee');
        setEmployeeCount(response.data.length); // Assuming the API returns an array and you want the count of items in the array
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchEmployeeCount();
  }, []);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/empLeave');
        const pendingLeaveData = response.data.filter(leave => leave.status === 'Pending');
        setPendingLeaveCount(pendingLeaveData.length);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchLeaveData();
  }, []);


  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/jobApplication');
        const pendingApplications = response.data.filter(application => application.status === 'Pending');
        setPendingJobApplications(pendingApplications.length);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchJobApplications();
  }, []);

  const transformLeaveData = (rawData) => {
    const statusCounts = {
      Pending: 0,
      Approved: 0,
      Rejected: 0,
    };

    rawData.forEach((leave) => {
      statusCounts[leave.status] += 1;
    });

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));
  };

  const transformReasonData = (rawData) => {
    const reasons = {
      Vacation: 0,
      'Sick Leave': 0,
      'Personal Leave': 0,
      'Family Emergency': 0,
      Other: 0,
    };

    rawData.forEach((leave) => {
      reasons[leave.reason] += 1;
    });

    return Object.keys(reasons).map((reason) => ({
      name: reason,
      value: reasons[reason],
    }));
  };
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const REASON_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#af19ff'];
  const { currentColor, currentMode } = useStateContext();
  useEffect(() => {
    fetchLeaveData();
  }, []);
  return (
    <div className="mt-24">
      {/* hero section -start */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div
          className="w-full lg:w-5/6 p-6"
          style={{
            backgroundImage: `url(${welcomeBg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '400px', // Adjust the height as needed
          }}
        >
          {/* Blurred background section */}
          <div
            className={`bg-${currentColor}-500 p-6 rounded-lg shadow-lg `}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background color
              borderRadius: '10px', // Rounded corners
              backdropFilter: 'blur(8px)',
              marginTop: '140px', // Adjust the margin-top to move it down
            }}
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to Employee Manager</h1>
            <p className="text-lg mb-4">Manage your employees with ease.</p>
            <div className="flex items-center">
              <Button primary>Get Started</Button>
              <IoIosMore className="ml-4 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      {/* hero section -end */}

       {/* display cards  */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 p-12">
      {/* Card 1 - Active Employee Count */}
      <div className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-400 hover:to-green-500 rounded-lg shadow-lg p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Active Employees</h3>
          <p className="text-3xl font-bold">{employeeCount}</p>
        </div>
        <IoPersonOutline className="text-5xl" />
      </div>

      {/* Card 2 - Requested Leaves */}
      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-indigo-400 hover:to-purple-500 rounded-lg shadow-lg p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Requested Leaves</h3>
          <p className="text-3xl font-bold">{pendingLeaveCount}</p>
        </div>
        <IoTimeOutline className="text-5xl" />
      </div>

      {/* Card 3 - Month Total Tasks */}
      <div className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-rose-400 hover:to-pink-500 rounded-lg shadow-lg p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Month Total Tasks</h3>
          <p className="text-3xl font-bold">42</p>
        </div>
        <IoAppsOutline className="text-5xl" />
      </div>

      {/* Card 4 - Completed Tasks */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-500 rounded-lg shadow-lg p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold">30</p>
        </div>
        <IoCheckmarkDoneOutline className="text-5xl" />
      </div>

      {/* Card 5 - Pending Tasks */}
      <div className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-400 hover:to-red-500 rounded-lg shadow-lg p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Pending Job Applications</h3>
          <p className="text-3xl font-bold">{pendingJobApplications}</p>
        </div>
        <IoAlertCircleOutline className="text-5xl" />
      </div>
       </div>

       {/* Charts section -start */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 p-6">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Header category="Charts" title="Employee Leave Status" />
          <PieChart width={500} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={leaveData}
              cx={200}
              cy={200}
              outerRadius={160}
              fill="#8884d8"
              label
            >
              {leaveData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Header category="Charts" title="Employee Leave Reasons" />
          <div style={{ position: 'relative', width: 550, height: 400 }}>
            <PieChart width={540} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={reasonData}
                cx={200}
                cy={200}
                outerRadius={160}
                fill="#8884d8"
                label
              >
                {reasonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={REASON_COLORS[index % REASON_COLORS.length]} />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="top"
                wrapperStyle={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
              />
            </PieChart>
          </div>
        </div>
        </div>
      </div>
  );
};

export default Analytics;
