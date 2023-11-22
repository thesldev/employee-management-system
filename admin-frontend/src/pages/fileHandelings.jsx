import React, { useState, useEffect } from 'react';
import { FileHandeling } from '../components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import {Header} from '../components';

const FilesHandelings = () => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [leavePdfBlob, setLeavePdfBlob] = useState(null);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8800/api/employee';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setEmployeeData(data))
      .catch((error) => console.error(error));
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF();
    const tableHeaders = ['Employee ID', 'Username', 'Address', 'Email', 'Mobile'];
    const tableData = employeeData.map((emp) => [
      emp._id,
      emp.employeeName,
      emp.address,
      emp.email,
      emp.telephone,
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    const pdfBlob = doc.output('blob');
    setPdfBlob(pdfBlob);
  };

  const downloadPdf = () => {
    if (pdfBlob) {
      // Use FileSaver.js to save the PDF as a file
      saveAs(pdfBlob, 'employee_data_report.pdf');
    } else {
      alert('Please generate the PDF first.');
    }
  };


  useEffect(() => {
    const apiUrl = 'http://localhost:8800/api/empLeave'; // Update the API endpoint for employee leave data

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setLeaveData(data))
      .catch((error) => console.error(error));
  }, []);

  const generateLeavePdf = () => {
    const doc = new jsPDF();
    const tableHeaders = ['Employee ID', 'Department', 'Start Date', 'End Date', 'Reason', 'Status'];
    const tableData = leaveData.map((leave) => [
      leave.employeeId, 
      leave.department,
      leave.from,
      leave.to,
      leave.reason,
      leave.status
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    const leavePdfBlob = doc.output('blob');
    setLeavePdfBlob(leavePdfBlob);
  };

  const downloadLeavePdf = () => {
    if (leavePdfBlob) {
      // Use FileSaver.js to save the PDF as a file
      saveAs(leavePdfBlob, 'employee_leave_report.pdf');
    } else {
      alert('Please generate the leave PDF first.');
    }
  };
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employee Reports" />
      <div className='p-6'>
        <h2 className="text-2xl font-semibold mb-4">Generate Employee Account Data</h2>
        <div className="space-x-4">
          <button
            onClick={generatePdf}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            GENERATE PDF
          </button>
          <button
            onClick={downloadPdf}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            DOWNLOAD PDF
          </button>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Employee Leave Data</h2>
        <div className="space-x-4">
          <button
            onClick={generateLeavePdf}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            GENERATE PDF
          </button>
          <button
            onClick={downloadLeavePdf}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            DOWNLOAD PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilesHandelings;
