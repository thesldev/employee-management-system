import React, { useState, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { FaTimes } from 'react-icons/fa';
import { Header } from '../components';

const EmployeeLeave = () => {
    const [empLeaveData, setEmpLeaveData] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [selectedApprovedLeave, setSelectedApprovedLeave] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:8800/api/empLeave';

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Log the data to the console
                const currentDate = new Date();
                const filteredData = data.filter(leave => {
                    const leaveToDate = new Date(leave.to);
                    return currentDate.getTime() <= leaveToDate.getTime();
                });
                setEmpLeaveData(filteredData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const viewDetails = (data) => {
        setSelectedLeave(data);
    };

    const viewApprovedDetails = (data) =>{
        setSelectedApprovedLeave(data);
    };

    const closeDialog = () => {
        setSelectedLeave(null);
    };

    const closeDialog2 = () => {
        setSelectedApprovedLeave(null);
    };

    const handleAcceptLeave = () => {
        // Send a PUT request to update the status to "Approved" on the server
        fetch(`http://localhost:8800/api/empLeave/${selectedLeave._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the API response here
            alert('Leave accepted');
            closeDialog();

            // Update the local state to reflect the change immediately
            const updatedData = empLeaveData.map((leave) => {
                if (leave._id === selectedLeave._id) {
                    return { ...leave, status: 'Approved' };
                }
                return leave;
            });
            setEmpLeaveData(updatedData);
        })
        .catch((error) => {
            console.error('Error accepting leave:', error);
        });
    };

    const handleRejectLeave = () => {
        // Send a PUT request to update the status to "Rejected" on the server
        fetch(`http://localhost:8800/api/empLeave/${selectedLeave._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Rejected' }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the API response here
            alert('Leave rejected');
            closeDialog();

            // Update the local state to reflect the change immediately
            const updatedData = empLeaveData.map((leave) => {
                if (leave._id === selectedLeave._id) {
                    return { ...leave, status: 'Rejected' };
                }
                return leave;
            });
            setEmpLeaveData(updatedData);
        })
        .catch((error) => {
            console.error('Error rejecting leave:', error);
        });
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Employee Leaves" />

            {/* leave requests -- status === pending */}
            <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-4">Requested leaves</h3>

                {empLeaveData && empLeaveData.length > 0 ? (
                    <GridComponent
                        dataSource={empLeaveData.filter((leave) => leave.status === 'Pending')}
                        width="auto"
                        allowPaging
                        allowSorting
                        pageSettings={{ pageCount: 5 }}
                        toolbar={['Search']}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="employeeId" headerText="Employee ID" width={150} className="text-center" />
                            <ColumnDirective field="department" headerText="Department" width={150} className="text-center" />
                            <ColumnDirective field="from" headerText="From" width={150} className="text-center" />
                            <ColumnDirective field="to" headerText="To" width={150} className="text-center" />
                            <ColumnDirective field="status" headerText="Status" width={150} className="text-center" />
                            <ColumnDirective
                                headerText="Actions"
                                width={200}
                                textAlign="Center"
                                template={(props) => (
                                    <div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => viewDetails(props)}
                                        >
                                            View
                                        </button>
                                    </div>
                                )}
                            />
                        </ColumnsDirective>
                        <Inject services={[Search, Page, Toolbar]} />
                    </GridComponent>
                ) : (
                    <p>No leave data available.</p>
                )}

                {/* Dark Overlay */}
                {selectedLeave && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
                        <div className="bg-white w-1/3 p-4 rounded shadow-lg relative">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                onClick={closeDialog}
                            >
                                <FaTimes /> {/* Add the close icon here */}
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Employee ID:</strong> {selectedLeave.employeeId}</p>
                                <p className="mb-1 text-gray-700"><strong>Department:</strong> {selectedLeave.department}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Title:</strong> {selectedLeave.title}</p>
                                <p className="mb-1 text-gray-700"><strong>Email:</strong> {selectedLeave.contactEmail}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>From:</strong> {new Date(selectedLeave.from).toLocaleDateString()}</p>
                                <p className="mb-1 text-gray-700"><strong>To:</strong> {new Date(selectedLeave.to).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Description:</strong> {selectedLeave.description}</p>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    onClick={handleAcceptLeave}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    onClick={handleRejectLeave}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* leave requests -- status === Approved */}
            <div  className="mt-24">
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-4">Approved leaves</h3>
            
                {empLeaveData && empLeaveData.length > 0 ? (
                    <GridComponent
                        dataSource={empLeaveData.filter((leave) => leave.status === 'Approved')}
                        width="auto"
                        allowPaging
                        allowSorting
                        pageSettings={{ pageCount: 5 }}
                        toolbar={['Search']}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="employeeId" headerText="Employee ID" width={150} className="text-center" />
                            <ColumnDirective field="department" headerText="Department" width={150} className="text-center" />
                            <ColumnDirective field="from" headerText="From" width={150} className="text-center" />
                            <ColumnDirective field="to" headerText="To" width={150} className="text-center" />
                            <ColumnDirective field="status" headerText="Status" width={150} className="text-center" />
                            <ColumnDirective
                                headerText="Actions"
                                width={200}
                                textAlign="Center"
                                template={(props) => (
                                    <div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => viewApprovedDetails(props)}
                                        >
                                            View
                                        </button>
                                    </div>
                                )}
                            />
                        </ColumnsDirective>
                        <Inject services={[Search, Page, Toolbar]} />
                    </GridComponent>
                ) : (
                    <p>No leave data available.</p>
                )}
                {selectedApprovedLeave && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
                        <div className="bg-white w-1/3 p-4 rounded shadow-lg relative">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                onClick={closeDialog2}
                            >
                                <FaTimes /> {/* Add the close icon here */}
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Employee ID:</strong> {selectedApprovedLeave.employeeId}</p>
                                <p className="mb-1 text-gray-700"><strong>Department:</strong> {selectedApprovedLeave.department}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Title:</strong> {selectedApprovedLeave.title}</p>
                                <p className="mb-1 text-gray-700"><strong>Email:</strong> {selectedApprovedLeave.contactEmail}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>From:</strong> {new Date(selectedApprovedLeave.from).toLocaleDateString()}</p>
                                <p className="mb-1 text-gray-700"><strong>To:</strong> {new Date(selectedApprovedLeave.to).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Description:</strong> {selectedApprovedLeave.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default EmployeeLeave;
