import express from 'express';
import { getNotes, updateNote,getNotesById, createNote, deleteNote } from '../controllers/notesController.js';
const router=express.Router();

router.get('/api/notes', getNotes);

router.get('/api/notes/:id', getNotesById);

router.post('/api/notes',createNote);

router.put('/api/notes/:id', updateNote);

router.delete('/api/notes/:id', deleteNote);

export default router;
