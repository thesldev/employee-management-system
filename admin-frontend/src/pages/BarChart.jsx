import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { Header } from '../components';
const BarChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/employee');
                const transformedData = transformData(response.data);
                setData(transformedData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const transformData = (rawData) => {
        let photographerMale = 0;
        let photographerFemale = 0;
        let driverMale = 0;
        let driverFemale = 0;

        rawData.forEach((employee) => {
            if (employee.designation === 'Photographer') {
                if (employee.gender === 'Male') {
                    photographerMale++;
                } else if (employee.gender === 'Female') {
                    photographerFemale++;
                }
            } else if (employee.designation === 'Driver') {
                if (employee.gender === 'Male') {
                    driverMale++;
                } else if (employee.gender === 'Female') {
                    driverFemale++;
                }
            }
        });

        return [
            {
                name: 'Photographer',
                Male: photographerMale,
                Female: photographerFemale,
            },
            {
                name: 'Driver',
                Male: driverMale,
                Female: driverFemale,
            },
        ];
    };

    return (
        <div style={{ margin: '50px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px' }}>
            <Header category="Charts" title="Employee Distribution by Gender" />
            <BarChart width={800} height={500} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Male" stackId="a" fill="#8884d8" barSize={150} />
                <Bar dataKey="Female" stackId="a" fill="#82ca9d" barSize={150} />
            </BarChart>
        </div>
    );
};

export default BarChartComponent;
