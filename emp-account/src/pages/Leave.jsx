import React, { useState } from 'react';
import { FaPlus, FaClock, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Leave = () => {
  const [isAddFormVisible, setAddFormVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId, setEmployeeId] = useState(''); // New Employee ID state

  const toggleAddForm = () => {
    setAddFormVisible(!isAddFormVisible);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted');

    const formData = {
      title,
      contactEmail,
      from,
      to,
      reason,
      department,
      description,
      employeeId,
      status: 'Pending',
    };

    fetch('http://localhost:8800/api/empLeave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here (e.g., show success message or error message)
        console.log('Registration response:', data);
      })
      .catch((error) => {
        console.error('Error registering employee:', error);
      });
  };

  return (
    <div style={{  minHeight: '100vh' }}>
      <div >
        {/* control buttons */}
        <div className="basis-3 flex flex-row items-start justify-start p-3 space-x-3 mt-8 ml-8">
          {/* New Download Button Style */}
          <a class="group relative inline-block focus:outline-none focus:ring"   >
            <span class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">Add</span>
          </a>

          {/* Link to "PendingLeaves" page with new button style */}
          <a class="group relative inline-block focus:outline-none focus:ring" href="/pending-leaves">
            <span class="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>
            <span class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">Pending</span>
          </a>

          {/* Link to "CheckedLeaves" page with new button style */}
          <a class="group relative inline-block focus:outline-none focus:ring" href="/checked-leaves">
            <span class="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>
            <span class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">View</span>
          </a>
        </div>
        <div className="flex flex-row space-x-8 mt-6 ml-11 ">   
          <div className="w-2/3 bg-slate-400 p-4 rounded-xl">
            {isAddFormVisible && (
              <div>
                <h1 className="text-2xl font-semibold">Add Leave</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      Reason
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a reason</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Family Emergency">Family Emergency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                        From
                      </label>
                      <input
                        type="date"
                        id="from"
                        name="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                        To
                      </label>
                      <input
                        type="date"
                        id="to"
                        name="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a department</option>
                      <option value="Photographer">Photographer</option>
                      <option value="Driver">Driver</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded w-32 h-12 flex items-center justify-center"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave