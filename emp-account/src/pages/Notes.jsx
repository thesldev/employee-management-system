import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [viewNote, setViewNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: '', description: '' });

  const navigate = useNavigate();

  // store form data in db
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const formData = {
      title,
      description,
      employeeID,
    };

    fetch('http://localhost:8800/api/empnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here (e.g., show success message or error message)
        console.log('Adding notes response:', data);
        // Close the modal after submitting the form
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error Adding Notes:', error);
      });
  };

  // fetch data from db
  useEffect(() => {
    // Retrieve user info from local storage
    const user = JSON.parse(localStorage.getItem('employeeInfo'));
    setEmployeeId(user?.employee_id); // Set employeeId directly

    if (user && user._id) {
      axios
        .get(`http://localhost:8800/api/employee/${user._id}`)
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
    // Fetch pending notes data based on the employee ID
    if (employeeId) {
      axios
        .get(`http://localhost:8800/api/empnote/notes/${employeeId}`)
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
  }, [employeeId]);

  const openModal = (note) => {
    setViewNote(note);
    setIsModalOpen(true);
  };

  const openUpdatePopup = () => {
    setIsEditModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setViewNote(null);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  // Delete the note
  const handleDelete = (noteId) => {
    // Make an API request to delete the note with the given noteId
    axios
      .delete(`http://localhost:8800/api/empnote/${noteId}`)
      .then((response) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        closeModal();
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
        // Handle any error that occurs during deletion
      });
  };

  // Update the note
  const handleUpdate = (noteId) => {
    // Make an API request to update the note with the given noteId and editedNote data
    axios
      .put(`http://localhost:8800/api/empnote/${noteId}`, editedNote)
      .then((response) => {
        // Handle the update success here, e.g., show a success message
        console.log('Note updated successfully:', response.data);
        closeModal();
        // You can update the notes state if needed
        // Reload the notes or update them in some way
        // fetch updated notes, setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
        // Handle any error that occurs during update
      });
  };

  return (
    <div className="bg-white rounded-3xl">
      {/* add note popup box */}
      <div>
        <button
          className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 mb-8 mr-3"
          onClick={() => setShowModal(true)}
          style={{ marginTop: '20px', marginLeft: '20px' }}
        >
          Add Notes
        </button>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-black">
            <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg p-4">
              <h1 className="text-2xl font-bold text-gray-500 mb-5">Add Notes</h1>
              <form onSubmit={handleSubmit}>
                {/* Form fields here */}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
                    Title:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
                    Employee ID:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter employee ID"
                    id="name"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    className="w-full border rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    cols="30"
                    rows="6"
                    placeholder="Write your notes here.."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    ADD NOTE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* display added note */}
      {notes.map((note) => (
        <div key={note._id} className="w-3/4 mx-auto bg-white rounded-md shadow-md p-4 mb-4 relative">
          <p className="text-lg font-semibold">{note.title}</p>
          <div className="flex items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h1V2a2 2 0 114 0v1h6V2a2 2 0 114 0v1h1a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600"> Created Date: {new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => openModal(note)}
            className="absolute top-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            View
          </button>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-black">
          <div className="modal-container bg-white w-4/6 mx-auto rounded shadow-lg relative p-3">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &#215;
            </button>
            <h1 className="text-2xl font-bold text-gray-500 mb-2">View Note</h1>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
                Title:
              </label>
              <div className="text-gray-700">{viewNote?.title}</div>
            </div>
            <div className="mb-4">
              <label htmlFor="updatedDate" className="block text-sm font-semibold text-gray-600">
                Updated Date:
              </label>
              <div className="text-gray-700">
                {new Date(viewNote?.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                Description:
              </label>
              <div className="text-gray-700">{viewNote?.description}</div>
            </div>

            <div className="mb-16 justify-items-end">
              <button
                onClick={() => handleDelete(viewNote._id)}
                className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 "
              >
                Delete
              </button>
              <button
                onClick={openUpdatePopup}
                className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-black">
    <div className="modal-container bg-white w-4/6 mx-auto rounded shadow-lg relative p-3">
      <button
        onClick={() => {
          setIsEditModalOpen(false);
          setEditedNote({ title: '', description: '' });
        }}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
      >
        &#215;
      </button>
      <h1 className="text-2xl font-bold text-gray-500 mb-2">Edit Note</h1>
      <form onSubmit={() => handleUpdate(viewNote._id)}>
        <div className="mb-4">
          <label htmlFor="editedTitle" className="block text-sm font-semibold text-gray-600">
            Edited Title:
          </label>
          <input
            type="text"
            placeholder="Enter edited title"
            id="editedTitle"
            value={editedNote.title} // Populate with the existing title
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            className="w-full border rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="editedDescription" className="block text-sm font-semibold text-gray-600">
            Edited Description:
          </label>
          <textarea
            id="editedDescription"
            cols="30"
            rows="6"
            placeholder="Edit your notes here.."
            value={editedNote.description} // Populate with the existing description
            onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
            className="w-full border rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setIsEditModalOpen(false);
              setEditedNote({ title: '', description: '' });
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Notes;
