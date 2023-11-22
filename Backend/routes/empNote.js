import express from 'express';

import { 
    createNote, 
    updateNote, 
    deleteNote, 
    getNote, 
    getNotes, 
    getNotesByEmployeeId
} from '../controllers/employeeNote.js';



const router = express.Router();

// Create a new Note
router.post("/", createNote);

// Update an existing Note
router.put("/:id", updateNote);

// Delete a Note
router.delete("/:id", deleteNote);

// Get a specific Note
router.get("/:id", getNote);

// Get all Notes
router.get("/", getNotes);

// Get  Notes By ID
router.get("/notes/:employeeID", getNotesByEmployeeId);

export default router;
