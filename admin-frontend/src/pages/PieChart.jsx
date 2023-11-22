import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/employee');
        const provinceData = transformData(response.data);
        setData(provinceData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  // Function to transform data into province counts
  const transformData = (rawData) => {
    const provinceCounts = {};

    rawData.forEach((employee) => {
      const province = employee.province;
      if (provinceCounts[province]) {
        provinceCounts[province] += 1;
      } else {
        provinceCounts[province] = 1;
      }
    });

    return Object.keys(provinceCounts).map((province) => ({
      name: province,
      value: provinceCounts[province],
    }));
  };

  const { currentColor } = useStateContext();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div style={{ margin: '50px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px' }}>
      <Header category="Charts" title="Employee Distribution by Province" />
      <PieChart width={800} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={300}
          cy={200}
          outerRadius={180}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
