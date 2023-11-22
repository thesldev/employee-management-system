import EmployeeNote from "../models/employeeNotes.js";


// Create a new note
export const createNote = async (req, res, next) => {
    const newNote = new EmployeeNote(req.body);
    try {
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
    } catch (err) {
        next(err);
    }
}

// Update an existing note
export const updateNote = async (req, res, next) => {
    try {
        const updateNote = await EmployeeNote.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateNote);
    } catch (err) {
        next(err);
    }
}

// Delete a note
export const deleteNote = async (req, res, next) => {
    try {
        await EmployeeNote.findByIdAndDelete(req.params.id);
        res.status(200).json("Leave has been deleted");
    } catch (err) {
        next(err);
    }
}

// Get a specific note
export const getNote = async (req, res, next) => {
    try {
        const Note = await EmployeeNote.findById(
            req.params.id
        );
        res.status(200).json(Note);
    } catch (err) {
        next(err);
    }
}

// Get all lnote
export const getNotes = async (req, res, next) => {
    try {
        const Notes = await EmployeeNote.find();
        res.status(200).json(Notes);
    } catch (err) {
        next(err);
    }
}


// get notes byemployee ID
export const getNotesByEmployeeId = async (req, res, next) => {
    const { employeeID} = req.params;

    try {
        // Fetch pending leaves with a status of "Accepted of Rejected" for the given employee ID
        const getNotesByID = await EmployeeNote.find({
            employeeID,
        });

        res.status(200).json(getNotesByID);
    } catch (err) {
        next(err);
    }
};