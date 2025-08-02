import express from 'express';
import { getNotes, updateNote,getNotesById, createNote, deleteNote } from '../controllers/notesController.js';
const router=express.Router();

router.get('/', getNotes);

router.get('/', getNotesById);

router.post('/',createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;
