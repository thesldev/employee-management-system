import React, { useState } from 'react';
import { Header, Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';


const EmployeeRegistration = () => {
  // Define state variables for form fields
  const [employeeName, setEmployeeName] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender,setGender] = useState('');
  const [province, setProvince] = useState('');
  const provinces = ["Central Province", "Eastern Province", "Northern Province", "North Central Province", "North Western Province", "Sabaragamuwa Province", "Southern Province", "Uva Province", "Western Province"];

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted');
    // Create an object with form data
    const formData = {
      employeeName,
      NIC,
      address,
      postal_code: postalCode,
      birth_day: birthDay,
      telephone,
      email,
      designation,
      employee_id: employeeId,
      emp_acc_password: password,
      age,
      province,
      gender
    };

    fetch('http://localhost:8800/api/employee', {
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
        if (data._id) { // Assuming the presence of an '_id' property indicates success
          alert('Registration successful');
          navigate('/employees');
        } else {
          alert('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error registering employee:', error);
        alert('Registration failed');
      });
  };

  const { currentColor, currentMode } = useStateContext();
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Employee Registration" />
        <div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 ml-4">
            <div className="mb-4">
                <label htmlFor="employeeName" className="block text-gray-700 text-sm font-bold mb-2">
                Employee Name:
                </label>
                <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="NIC" className="block text-gray-700 text-sm font-bold mb-2">
                NIC:
                </label>
                <input
                type="text"
                id="NIC"
                value={NIC}
                onChange={(e) => setNIC(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Address:
                </label>
                <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
              <label htmlFor="province" className="block text-gray-700 text-sm font-bold mb-2">
                Province:
              </label>
              <select
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a province</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
                <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">
                Postal Code:
                </label>
                <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="birthDay" className="block text-gray-700 text-sm font-bold mb-2">
                Birth Day:
                </label>
                <input
                type="date"
                id="birthDay"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                Employee Age:
                </label>
                <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                    Employee Gender:
                </label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2">
                Telephone:
                </label>
                <input
                type="tel"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email:
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">
                    Designation:
                </label>
                <select
                    id="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select Designation</option>
                    <option value="Driver">Driver</option>
                    <option value="Photographer">Photographer</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">
                Employee ID:
                </label>
                <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password:
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
            <div className="mt-6 space-x-4">
                <Button
                color="white"
                bgColor={currentColor}
                text="Register"
                borderRadius="10px"
                size="md"
                type="submit"
                >
                    Register
                </Button>
                <Button
                color="white"
                bgColor={currentColor}
                text="Cancle"
                borderRadius="10px"
                size="md"
                />
            </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default EmployeeRegistration;



