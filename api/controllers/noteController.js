const  Note  = require('../models/note');
const  User  = require('../models/user');
const  Category = require('../models/category');

const NoteController = {

    getAllNotes: async (req, res, next) => {
        try {
            const notes = await Note.findAll({
                include: [{model: Category}, {model: User}],
            });
            res.json(notes);
        } catch (error) {
            next(error);
        }
    },

    getFilteredNotes: async (req, res, next) => {
        try {
            console.log("EL VALOR DE QUERY ES: ", req.query)
            const { archived } = req.query;
            let notes;
            console.log("EL VALOR DE ARCHIVED ES: ", archived)

            if (archived === 'true') {
                notes = await Note.findAll({
                    where: { archived: true },
                    include: [{ model: Category }, { model: User }],
                });
            } else if (archived === 'false') {
                notes = await Note.findAll({
                    where: { archived: false },
                    include: [{ model: Category }, { model: User }],
                });
            } else {
                notes = await Note.findAll({
                    include: [{ model: Category }, { model: User }],
                });
            }

            res.json(notes);
        } catch (error) {
            next(error);
        }
    },

    updateArchivedStatus: async (req, res, next) => {
        try {
            const noteId = req.params.id;

            // Buscar la nota por su ID
            const note = await Note.findByPk(noteId);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            // Cambiar el estado de "archived"
            note.archived = !note.archived;

            await note.save();

            // Volver a buscar la nota para incluir las categorías actualizadas
            const updatedNote = await Note.findByPk(noteId, {
                include: [{ model: Category }, { model: User }]
            });

            res.json(updatedNote);
        } catch (error) {
            next(error);
        }
    },

    deleteNote: async (req, res, next) => {
        try {
            const noteId = req.params.id;

            // Buscar la nota por su ID
            const note = await Note.findByPk(noteId);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            // Eliminar la nota
            await note.destroy();

            res.json({ message: 'Note deleted successfully' });
        } catch (error) {
            next(error);
        }
    },

    getNoteById: async (req, res, next) => {
        try {
            const note = await Note.findByPk(req.params.id, {
                include: [
                    { model: Category },
                    { model: User },
                ],
            });
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.json(note);
        } catch (error) {
            next(error);
        }
    },

    createNote: async (req, res, next) => {
        try {
            const {title, content, UserId, CategoryId} = req.body;
            console.log(req.body);

            let note;

            if (Array.isArray(CategoryId)) {
                note = await Note.create({
                    title,
                    content,
                    UserId: UserId,
                    CategoryId: CategoryId.length > 0 ? CategoryId[0] : null,
                });
            } else {
                // if categoty isn't array, create
                note = await Note.create({
                    title,
                    content,
                    UserId: UserId,
                    CategoryId: CategoryId,
                });
            }

            res.status(201).json(note);
        } catch (error) {
            next(error);
        }
    },


    updateNote: async (req, res, next) => {
        try {
            const noteId = req.params.id;
            const { title, content, CategoryId, UserId } = req.body;

            // Buscar la nota por su ID
            const note = await Note.findByPk(noteId);

            console.log(req.body)

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            // Actualizar información de la nota
            note.title = title;
            note.content = content;
            note.UserId = UserId;

            await note.save();

            // Actualizar categorías
            if (Array.isArray(CategoryId)) {
                const categories = await Category.findAll({
                    where: { id: CategoryId }
                });
                // Llamar a setCategories después de que la nota esté guardada
                await note.setCategories(categories);
            } else if (CategoryId !== null) {
                console.log("Category id> ",CategoryId)
                const category = await Category.findByPk(CategoryId);

                if (category) {
                    await note.setCategories([category]);
                }
            }

            // Volver a buscar la nota para incluir las categorías actualizadas
            const updatedNote = await Note.findByPk(noteId, {
                include: [{ model: Category }, { model: User }]
            });

            res.json(updatedNote);
        } catch (error) {
            next(error);
        }
    },

    updateNoteCategories: async (req, res, next) => {
        try {
            const noteId = req.params.id;
            const { CategoryIds } = req.body;

            // Buscar la nota por su ID
            const note = await Note.findByPk(noteId);

            if (!note) {
                return res.status(404).json({ error: 'Nota no encontrada' });
            }

            // Buscar las categorías por los IDs
            const categories = await Category.findAll({
                where: { id: CategoryIds },
            });

            if (categories.length !== CategoryIds.length) {
                return res.status(400).json({ error: 'No se pudieron encontrar todas las categorías' });
            }

            // Actualizar las categorías de la nota
            await note.setCategories(categories);

            // Obtener la nota actualizada con las categorías
            const updatedNote = await Note.findByPk(noteId, {
                include: [{ model: Category }],
            });

            res.json(updatedNote);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = NoteController;
