import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const LineChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/employee');
        const ageData = transformData(response.data);
        setData(ageData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  // Function to transform data into age groups and count employees in each group
  const transformData = (rawData) => {
    const ageGroups = {
      '20-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51-60': 0,
      '61+': 0,
    };

    rawData.forEach((employee) => {
      const age = employee.age;
      if (age >= 20 && age <= 30) {
        ageGroups['20-30'] += 1;
      } else if (age >= 31 && age <= 40) {
        ageGroups['31-40'] += 1;
      } else if (age >= 41 && age <= 50) {
        ageGroups['41-50'] += 1;
      } else if (age >= 51 && age <= 60) {
        ageGroups['51-60'] += 1;
      } else {
        ageGroups['61+'] += 1;
      }
    });

    return Object.keys(ageGroups).map((ageGroup) => ({
      name: ageGroup,
      employees: ageGroups[ageGroup],
    }));
  };

  const { currentColor } = useStateContext();

  return (
    <div style={{ margin: '50px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px' }}>
      <Header category="Charts" title="Employee Age Range" />
      <LineChart width={800} height={600} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="employees" stroke={currentColor} />
      </LineChart>  
    </div>
  );
};

export default LineChartComponent;
