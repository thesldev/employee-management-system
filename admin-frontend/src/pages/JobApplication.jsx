import React, { useState, useEffect } from 'react';
import { Header} from '../components';
import { Link } from 'react-router-dom';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { FaTimes } from 'react-icons/fa';

const JobApplication = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8800/api/jobApplication';

    fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setJobApplications(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
        }, []);
  

        const viewDetails = (data) => {
            setSelectedJobs(data);
        };   

        const closeDialog = () => {
            setSelectedJobs(null);
        };
    

        const handleAcceptJob = () => {
            fetch(`http://localhost:8800/api/jobApplication/${selectedJobs._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: 'Approved' }),
            })
              .then((response) => response.json())
              .then((data) => {
                alert('Job accepted');
                closeDialog();
        
                const updatedData = jobApplications.map((jobdata) => {
                  if (jobdata._id === selectedJobs._id) {
                    return { ...jobdata, status: 'Approved' };
                  }
                  return jobdata;
                });
                setJobApplications(updatedData);
              })
              .catch((error) => {
                console.error('Error accepting job:', error);
              });
          };
        
          const handleRejectJob = () => {
            fetch(`http://localhost:8800/api/jobApplication/${selectedJobs._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: 'Rejected' }),
            })
              .then((response) => response.json())
              .then((data) => {
                alert('job rejected');
                closeDialog();
        
                const updatedData = jobApplications.map((jobdata) => {
                  if (jobdata._id === selectedJobs._id) {
                    return { ...jobdata, status: 'Rejected' };
                  }
                  return jobdata;
                });
                setJobApplications(updatedData);
              })
              .catch((error) => {
                console.error('Error rejecting job:', error);
              });
          };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Job Applications" />
      <div>
                {jobApplications && jobApplications.length > 0 ? (
                    <GridComponent
                        dataSource={jobApplications.filter((data) => data.status === 'Pending')}
                        width="auto"
                        allowPaging
                        allowSorting
                        pageSettings={{ pageCount: 5 }}
                        toolbar={['Search']}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="full_name" headerText="Applicant Name" width={150} className="text-center" />
                            <ColumnDirective field="email" headerText="Email" width={150} className="text-center" />
                            <ColumnDirective field="availability" headerText="Availability" width={150} className="text-center" />
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
                    <p>No application data available.</p>
                )}
                {/* Dark Overlay */}
                {selectedJobs && (
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
                                <p className="mb-1 text-gray-700"><strong>Applicant Name:</strong> {selectedJobs.full_name}</p>
                                <p className="mb-1 text-gray-700"><strong>Address:</strong> {selectedJobs.address}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Postal Code:</strong> {selectedJobs.postal_code}</p>
                                <p className="mb-1 text-gray-700"><strong>Age:</strong> {selectedJobs.age}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Contact No:</strong> {new Date(selectedJobs.contact_no).toLocaleDateString()}</p>
                                <p className="mb-1 text-gray-700"><strong>Contact Email:</strong> {new Date(selectedJobs.email).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Experience:</strong> {new Date(selectedJobs.experience).toLocaleDateString()}</p>
                                <p className="mb-1 text-gray-700"><strong>References:</strong> {new Date(selectedJobs.references).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Licence Type:</strong> {new Date(selectedJobs.licence_type).toLocaleDateString()}</p>
                                <p className="mb-1 text-gray-700"><strong>Certificates:</strong> {new Date(selectedJobs.certificates).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-gray-700"><strong>Availability:</strong> {selectedJobs.availability}</p>
                                <p className="mb-1 text-gray-700"><strong>Description:</strong> {selectedJobs.description}</p>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    onClick={handleAcceptJob}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    onClick={handleRejectJob}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
            <div className="mt-4">
        <Link to="/job-application-history" className="text-blue-500 hover:underline">
          View Job Application History
        </Link>
      </div>
    </div>
  );
};

export default JobApplication;
