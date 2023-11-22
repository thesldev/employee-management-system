import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaTimes } from 'react-icons/fa';
import { Header, Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios'

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleAddEvent = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const formData = {
      title,
      from,
      to,
      location,
      description,
    };

    fetch('http://localhost:8800/api/calender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Add event response:', data);
      })
      .catch((error) => {
        console.error('Error adding events:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatEvents = (events) => {
    return events.map((event) => ({
      _id: event._id, // Make sure to include the _id property
      start: new Date(event.from),
      end: new Date(event.to),
      title: event.title,
      location: event.location,
      description: event.description,
    }));
  };

  const fetchEvents = () => {
    fetch('http://localhost:8800/api/calender')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched events:', data);
        setEvents(formatEvents(data));
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const openEventPopup = (event) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  // update event details

  const handleEditEvent = () => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setFrom(format(new Date(selectedEvent.start), 'yyyy-MM-dd'));
      setTo(format(new Date(selectedEvent.end), 'yyyy-MM-dd'));
      setLocation(selectedEvent.location);
      setDescription(selectedEvent.description);
      setShowEditPopup(true);
    }
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for editing');

    const updatedData = {
      title,
      from,
      to,
      location,
      description,
    };
  
    axios
      .put(`http://localhost:8800/api/calender/${selectedEvent._id}`, updatedData)
      .then((response) => {
        console.log('Update event response:', response.data);
        fetchEvents();
        setShowEditPopup(false); // Close the edit popup after updating the data
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };



  //  delete the calander event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      axios
        .delete(`http://localhost:8800/api/calender/${selectedEvent._id}`)
        .then((response) => {
          console.log('Delete event response:', response.data);
          fetchEvents();
          setShowPopup(false);
          setSelectedEvent(null); // Reset selectedEvent to hide the popup
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  };


  const { currentColor, currentMode } = useStateContext();


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Calendar" />
      <div className="mb-4">
        <Button
          color="white"
          bgColor={currentColor}
          text="Add Event"
          borderRadius="10px"
          size="md"
          type="submit"
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </div>
      <div style={{ position: 'relative', marginLeft: '-50px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: 50, fontFamily: 'Open Sans, sans-serif' }}
          onSelectEvent={(event) => openEventPopup(event)}
        />

        {showForm && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '999',
            }}
          >
            <div style={{ width: '350px', background: 'white', padding: '20px' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Event</h2>
                <FaTimes className="cursor-pointer" onClick={handleCloseForm} />
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                <label htmlFor="from" className="block text-sm font-semibold text-gray-600">
                  From:
                </label>
                <input
                  type="date"
                  placeholder="From"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                <label htmlFor="to" className="block text-sm font-semibold text-gray-600">
                  To:
                </label>
                <input
                  type="date"
                  placeholder="To"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                <label htmlFor="location" className="block text-sm font-semibold text-gray-600">
                  Location:
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                  Description:
                </label>
                <textarea
                  placeholder="Description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                   Submit
                </button>
              </form>
            </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg relative">
              <div className="absolute top-0 right-0 p-2 cursor-pointer">
                <FaTimes className="text-gray-600" onClick={closePopup} />
              </div>
              <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
              <p className="mb-2">Start: {selectedEvent.start.toString()}</p>
              <p className="mb-2">End: {selectedEvent.end.toString()}</p>
              <p className="mb-2">Location: {selectedEvent.location}</p>
              <p className="mb-4">Description: {selectedEvent.description}</p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleEditEvent}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* updae event deTAILS */}
        {showEditPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg relative">
              <form onSubmit={handleEditSubmit}>
                {/* Title field */}
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold">Edit Event</h2>
                  {/* Close icon */}
                  <FaTimes className="text-gray-600 cursor-pointer" onClick={closeEditPopup} />
                </div>
                {/* Title input */}
                <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                {/* From input */}
                <label htmlFor="from" className="block text-sm font-semibold text-gray-600">
                  From:
                </label>
                <input
                  type="date"
                  placeholder="From"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                {/* To input */}
                <label htmlFor="to" className="block text-sm font-semibold text-gray-600">
                  To:
                </label>
                <input
                  type="date"
                  placeholder="To"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                {/* Location input */}
                <label htmlFor="location" className="block text-sm font-semibold text-gray-600">
                  Location:
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                {/* Description input */}
                <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                  Description:
                </label>
                <textarea
                  placeholder="Description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4 w-full p-2 rounded bg-gray-100"
                />
                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
