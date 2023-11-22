import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components';

const EmployeeProfile = () => {
  const { AccountID } = useParams();
  const apiUrl = `http://localhost:8800/api/employee/${AccountID}`;
  const [dataP, setDataP] = useState([]);
  const navigate = useNavigate();

  // State for controlling the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDataP(data); // Store the fetched employee data in dataP
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [apiUrl]);

  const {
    employeeName,
    NIC,
    address,
    postal_code,
    birth_day,
    telephone,
    email,
    designation,
    employee_id,
    createdAt,
    age,
    province,
    _id,
  } = dataP;

  const handleDelete = () => {
    // Trigger an alert before deleting the data
    if (window.confirm('Are you sure you want to delete this employee?')) {
      // Send a DELETE request to delete the employee
      fetch(apiUrl, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Redirect to the employee list page or any other appropriate page after successful deletion
          navigate('/employees');
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
  };

  // Function to open the update popup
  const openUpdatePopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the update popup
  const closeUpdatePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to handle the employee update
  const handleUpdate = () => {
    closeUpdatePopup();
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employee Profile" />
      <div>
        <div class="flex items-center py-4 overflow-x-auto whitespace-nowrap">
          <a href="/Analytics" class="text-gray-600 dark:text-gray-200 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>

          <span class="mx-5 text-gray-500 dark:text-gray-300">
            /
          </span>

          <a href="/employees" class="text-gray-600 dark:text-gray-200 hover:underline">
            Employees
          </a>

        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          {employee_id} <br />Employee Profile
        </h1>
        <div>
          <button
            onClick={openUpdatePopup}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Update
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2014/04/02/14/11/male-306408_1280.png"
            alt="Employee"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="ml-10">
          <div className="mb-4">
            <strong>Name:</strong> {employeeName}
          </div>
          <div className="mb-4">
            <strong>NIC:</strong> {NIC}
          </div>
          <div className="mb-4">
            <strong>Address:</strong> {address}
          </div>
          <div className="mb-4">
            <strong>Province:</strong> {province}
          </div>
          <div className="mb-4">
            <strong>Postal Code:</strong> {postal_code}
          </div>
          <div className="mb-4">
            <strong>Birth Day:</strong> {birth_day}
          </div>
          <div className="mb-4">
            <strong>Employee Age:</strong> {age}
          </div>
          <div className="mb-4">
            <strong>Telephone:</strong> {telephone}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {email}
          </div>
          <div className="mb-4">
            <strong>Designation:</strong> {designation}
          </div>
          <div className="mb-4">
            <strong>Employee ID:</strong> {employee_id}
          </div>
          <div className="mb-4">
            <strong>Hire Date:</strong> {createdAt}
          </div>
        </div>
      </div>

      {/* Update Popup */}
      {isPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative bg-white rounded-lg p-4 w-96">
      <form>
        {/* Input fields for editing */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          {/* Left column */}
          <div className="col-span-1">
            <div className="mb-4">
              <label htmlFor="employeeName" className="block font-medium">
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.employeeName}
                onChange={(e) =>
                  setDataP({ ...dataP, employeeName: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label htmlFor="NIC" className="block font-medium">
                NIC
              </label>
              <input
                type="text"
                id="NIC"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.NIC}
                onChange={(e) => setDataP({ ...dataP, NIC: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.address}
                onChange={(e) => setDataP({ ...dataP, address: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="postal_code" className="block font-medium">
                Postal Code
              </label>
              <input
                type="text"
                id="postal_code"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.postal_code}
                onChange={(e) => setDataP({ ...dataP, postal_code: e.target.value })}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-1">
            <div className="mb-4">
              <label htmlFor="birth_day" className="block font-medium">
                Birth Day
              </label>
              <input
                type="date"
                id="birth_day"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.birth_day}
                onChange={(e) => setDataP({ ...dataP, birth_day: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="telephone" className="block font-medium">
                Telephone
              </label>
              <input
                type="text"
                id="telephone"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.telephone}
                onChange={(e) => setDataP({ ...dataP, telephone: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.email}
                onChange={(e) => setDataP({ ...dataP, email: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="designation" className="block font-medium">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.designation}
                onChange={(e) => setDataP({ ...dataP, designation: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="employee_id" className="block font-medium">
                Employee ID
              </label>
              <input
                type="text"
                id="employee_id"
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                value={dataP.employee_id}
                onChange={(e) => setDataP({ ...dataP, employee_id: e.target.value })}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 flex justify-end">
        <button
          onClick={closeUpdatePopup}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EmployeeProfile;
