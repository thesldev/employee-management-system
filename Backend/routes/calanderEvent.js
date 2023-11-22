import express from 'express'

import { 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getEvent, 
    getEvents 
} from '../controllers/calendarEventController.js'


const router = express.Router();

// Create a new Event
router.post("/", createEvent);

// Update an existing Event
router.put("/:id", updateEvent);

// Delete a Event
router.delete("/:id", deleteEvent);

// Get a specific Event
router.get("/:id", getEvent);

// Get all Events
router.get("/", getEvents);

export default router;