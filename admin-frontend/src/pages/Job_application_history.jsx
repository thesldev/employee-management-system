import React, { useState, useEffect } from 'react';
import { Header} from '../components';
import { Link } from 'react-router-dom';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { FaTimes } from 'react-icons/fa';

const Job_application_history = () => {

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

        const handleDelete = (data) => {
          setSelectedJobs(data);
          const jobId = data._id;
          const apiUrl = `http://localhost:8800/api/jobApplication/${jobId}`;
        
          fetch(apiUrl, {
            method: 'DELETE',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              } else {
                // Filter out the deleted job application from the list
                const updatedData = jobApplications.filter((jobdata) => jobdata._id !== jobId);
                setJobApplications(updatedData);
              }
            })
            .catch((error) => {
              console.error('Error deleting job application:', error);
            });
        };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Job Applications History" />
      {/* bredcrumb */}
      <div class="flex items-center py-4 overflow-x-auto whitespace-nowrap">
        <a href="/Analytics" class="text-gray-600 dark:text-gray-200 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>

        <span class="mx-5 text-gray-500 dark:text-gray-300">
          /
        </span>

        <a href="/Job-Application" class="text-gray-600 dark:text-gray-200 hover:underline">
          Employee Job Applications
        </a>

        <span class="mx-5 text-gray-500 dark:text-gray-300">
          /
        </span>

        <a href="/job-application-history" class="text-gray-600 dark:text-gray-200 hover:underline">
          Job Application History
        </a>

      </div>
      <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-4">History</h3>

          {jobApplications && jobApplications.length > 0 ? (
              <GridComponent
                  dataSource={jobApplications}
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
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => viewDetails(props)}
                                >
                                  View
                                </button>
                                <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleDelete(props)}
                                >
                                  Delete
                                </button>
                              </div>
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
                      <h2 className="text-2xl font-semibold mb-4">Application Details</h2>
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
                  </div>
              </div>
          )}
                
      </div>
    </div>
  )
}

export default Job_application_history