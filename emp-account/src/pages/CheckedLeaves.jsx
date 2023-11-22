import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckedLeaves = () => {

    const [checkedLeaves, setCheckedLeaves] = useState([]);
    const [employeeId, setEmployeeId] = useState(null);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    useEffect(() => {
        // Retrieve user info from local storage
        const user = JSON.parse(localStorage.getItem('employeeInfo'));
        setEmployeeId(user?.employee_id); // Set employeeId directly

        if (user && user._id) {
            axios.get(`http://localhost:8800/api/employee/${user._id}`)
                .then((response) => {
                    // Update the state with additional user details
                    setEmployeeId(response.data.employee_id); // Set the employeeId state here
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []);


    useEffect(() => {
        // Fetch pending leaves data based on the employee ID
        if (employeeId) {
            axios.get(`http://localhost:8800/api/empLeave/finished/${employeeId}`)
                .then((response) => {
                    setCheckedLeaves(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching pending leaves:', error);
                });
        }
    }, [employeeId]);


    // Function to open the modal and set the selected leave
    const openModal = (leave) => {
        setSelectedLeave(leave);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedLeave(null);
        setIsModalOpen(false);
    };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {/* bredcrumb */}
        <div class="flex items-center py-4 overflow-x-auto whitespace-nowrap">
                <a href="/home" class="text-gray-600 dark:text-gray-200 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>

                <span class="mx-5 text-gray-500 dark:text-gray-300">
                    /
                </span>

                <a href="/leaves" class="text-gray-600 dark:text-gray-200 hover:underline">
                    Leaves
                </a>

                <span class="mx-5 text-gray-500 dark:text-gray-300">
                    /
                </span>

                <a href="/checked-leaves" class="text-gray-600 dark:text-gray-200 hover:underline">
                    Checked Leaves
                </a>

            </div>
            <div className="text-center">
                <div className="flex items-start justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Pending Leaves</h1>
                </div>
                {/* Render the pending leaves data */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Title
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Reason
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Department
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Employee ID
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Status
                                </th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {checkedLeaves.map((leave) => (
                                <tr key={leave._id}>
                                    <td className="px-4 py-2 text-gray-900">
                                        {leave.title}
                                    </td>
                                    <td className="px-4 py-2 text-gray-900">
                                        {leave.reason}
                                    </td>
                                    <td className="px-4 py-2 text-gray-900">
                                        {leave.department}
                                    </td>
                                    <td className="px-4 py-2 text-gray-900">
                                        {leave.employeeId}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`rounded p-1 ${leave.status === 'Pending' ? 'bg-yellow-500 text-white' : leave.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => openModal(leave)} // Open modal on button click
                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-start z-50">
                        <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg p-4">
                            <h2 className="text-lg font-semibold mb-2">Leave Details</h2>
                            {/* Display selected leave details here */}
                            <p>Title: {selectedLeave?.title}</p>
                            <p>Reason: {selectedLeave?.reason}</p>
                            <p>Department: {selectedLeave?.department}</p>
                            <p>From: {selectedLeave?.from}</p>
                            <p>To: {selectedLeave?.to}</p>
                            <p>Email: {selectedLeave?.contactEmail}</p>
                            <p>Description: {selectedLeave?.description}</p>
                            {/* Add more details as needed */}
                            <button
                                onClick={closeModal}
                                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div> 
        </div>
  )
}

export default CheckedLeaves