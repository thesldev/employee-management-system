import CalendarEvent from '../models/calendarData.js';

// Create a new Event
export const createEvent = async (req, res, next) => {
    const newEvent = new CalendarEvent(req.body);
    try {
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        next(err);
    }
}

// Update an existing Event
// export const updateEvent = async (req, res, next) => {
//     try {
//         const updateEvent = await CalendarEvent.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updateEvent);
//     } catch (err) {
//         next(err);
//     }
// }

// Delete a Event
export const deleteEvent = async (req, res, next) => {
    try {
        await CalendarEvent.findByIdAndDelete(req.params.id);
        res.status(200).json("Event has been deleted");
    } catch (err) {
        next(err);
    }
}

// Get a specific Event
export const getEvent = async (req, res, next) => {
    try {
        const Event = await CalendarEvent.findById(
            req.params.id
        );
        res.status(200).json(Event);
    } catch (err) {
        next(err);
    }
}

// Get all Events
export const getEvents = async (req, res, next) => {
    try {
        const Events = await CalendarEvent.find();
        res.status(200).json(Events);
    } catch (err) {
        next(err);
    }
}


// Update an existing event
export const updateEvent = async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const eventData = req.body;
  
      const updatedEvent = await CalendarEvent.findByIdAndUpdate(eventId, eventData, {
        new: true,
      });
  
      if (!updatedEvent) {d
        return res.status(404).json({
          success: false,
          message: 'Event not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        data: updatedEvent,
      });
    } catch (error) {
      next(error);
    }
  };





