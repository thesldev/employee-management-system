import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';


import ActiveEmployeeGrid from '../structure/ActiveEmployeeGrid';
import { Header } from '../components';

const ActiveEmployees = () => {

    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() =>{
        const apiUrl = 'http://localhost:8800/api/employee';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setEmployeeData(data))
            .catch((error) => console.error(error));

    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Employees" />
            <GridComponent
                dataSource={employeeData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                toolbar={['Search']}
                style={{ borderSpacing: '10px' }}
            >
                    <ColumnsDirective>
                        <ColumnDirective field="employee_id" headerText="Employee ID" width={150} className="text-center" />
                        <ColumnDirective field="employeeName" headerText="Employee Name" width={200} className="text-center" />
                        <ColumnDirective field="designation" headerText="Department" width={150} className="text-center" />
                        <ColumnDirective field="NIC" headerText="NIC" width={150} className="text-center" />
                        <ColumnDirective field="telephone" headerText="Mobile No" width={150} className="text-center" />
                        <ColumnDirective
                            headerText="Actions"
                            width={100}
                            textAlign="Center"
                            template={(props) => (
                                <Link
                                to={`/employee/${props._id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                View
                                </Link>
                            )}
                        />
                    </ColumnsDirective>
                <Inject services={[Search, Page, Toolbar]} />
            </GridComponent>
        </div>
    )
}

export default ActiveEmployees;