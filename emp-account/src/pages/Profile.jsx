import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('employeeInfo'));
    if (user) {
      setEmployeeId(user.employee_id);
  
      axios
        .get(`http://localhost:8800/api/employee/${user._id}`)
        .then((response) => {
          setEmployeeDetails(response.data);
          if (response.data.profileImage && response.data.profileImage.data) {
            const imageBuffer = Buffer.from(response.data.profileImage.data.data);
            const imgUrl = `data:${response.data.profileImage.contentType};base64,${imageBuffer.toString('base64')}`;
            setImageUrl(imgUrl);
          }
        })
        .catch((error) => {
          console.error('Error fetching employee details:', error);
        });
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleUpload = () => {
    if (file && employeeId) {
      const formData = new FormData();
      formData.append('profileImage', file);

      axios
        .post(`http://localhost:8800/api/employee/uploadProfileImage/${employeeId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('Image uploaded successfully', response.data);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    } else {
      console.error('File or employee ID is undefined');
    }
  };


  return (
    <div className="flex flex-row  ml-10 ">
      <div className="mt-16 flex flex-col justify-center items-start">
        <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>
        <p className="text-lg mt-4 text-left">Employee Name: <span style={{ color: 'gray' }}>{employeeDetails.employeeName}</span></p>
        <p className="text-lg mt-4 text-left">Employee ID: <span style={{ color: 'gray' }}>{employeeDetails.employee_id}</span></p>
        <p className="text-lg mt-4 text-left">Employee NIC: <span style={{ color: 'gray' }}>{employeeDetails.NIC}</span></p>
        <p className="text-lg mt-4 text-left">Employee Address: <span style={{ color: 'gray' }}>{employeeDetails.address}</span></p>
        <p className="text-lg mt-4 text-left">Employee Postal Code: <span style={{ color: 'gray' }}>{employeeDetails.postal_code}</span></p>
        <p className="text-lg mt-4 text-left">Employee Birth Day: <span style={{ color: 'gray' }}>{formatDate(employeeDetails.birth_day)}</span></p>
        <p className="text-lg mt-4 text-left">Employee Telephone: <span style={{ color: 'gray' }}>{employeeDetails.telephone}</span></p>
        <p className="text-lg mt-4 text-left">Employee Email: <span style={{ color: 'gray' }}>{employeeDetails.email}</span></p>
        <p className="text-lg mt-4 text-left">Employee Department: <span style={{ color: 'gray' }}>{employeeDetails.designation}</span></p>
        <p className="text-lg mt-4 text-left">Employee Age: <span style={{ color: 'gray' }}>{employeeDetails.age}</span></p>
        <div className="mt-28">
          <h2 className="text-2xl font-semibold mb-4">Update My Profile Pcture</h2>
          <form className="w-full max-w-sm">
            <div className="mb-6">
              <label htmlFor="input10" className="block text-gray-600 text-sm font-medium mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:shadow-outline"
                placeholder="Input 10"
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
            <div className="mt-4">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" 
                type="button"
                onClick={handleUpload}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4">
          {imageUrl ? (
            <img src={imageUrl} alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          ) : (
            <div>No Image Found</div>
          )}
        </div>
    </div>
  );
};

export default Profile;
