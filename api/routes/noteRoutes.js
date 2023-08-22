const express = require('express');
const NoteController = require('../controllers/noteController');

const router = express.Router();

// Rutas para notas
router.get('/list', NoteController.getFilteredNotes); // Define esta ruta primero
router.get('/:id', NoteController.getNoteById);
router.put('/:id', NoteController.updateNote);
router.put('/archived/:id', NoteController.updateArchivedStatus);
router.get('/', NoteController.getAllNotes); // Esta es la ruta más general, define esta última
router.post('/', NoteController.createNote);
router.delete('/:id', NoteController.deleteNote)
router.put('/:id/categories',NoteController.updateNoteCategories)
/*
router.get('/:id/categories', NoteController.getNoteCategories);

router.delete('/:id', NoteController.deleteNote);*/

module.exports = router;
