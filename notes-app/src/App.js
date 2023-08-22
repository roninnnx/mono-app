import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import noteService from './services/noteService';
import createNoteService from './services/createNoteService';
import './App.css';
import CreateNotePopup from './components/CreateNotePopup';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [isCreateNoteEnabled, setIsCreateNoteEnabled] = useState(true);

    useEffect(() => {
        fetchData();
    }, [showArchived]);

    const fetchData = async () => {
        try {
            const data = await noteService.fetchNotes(showArchived);
            console.log('Fetching notes:', data);
            setNotes(data);
            setIsCreateNoteEnabled(!showArchived);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleCreateNote = async (newNote) => {
        try {
            const createdNote = await createNoteService.createNote(newNote);
            setNotes([...notes, createdNote]);
            setIsPopupVisible(false);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const handleEditNote = (note) => {
        setNoteToEdit(note);
        setIsPopupVisible(true);
    };

    const handleUpdateNote = async (noteId, updatedNote) => {
        try {
            await createNoteService.updateNote(noteId, updatedNote);
            fetchData();
            setIsPopupVisible(false);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleArchiveNote = async (note) => {
        try {
            const archivedNote = await noteService.archiveNote(note.id);
            console.log('Nota archivada:', archivedNote);
            fetchData();
        } catch (error) {
            console.error('Error archiving note:', error);
        }
    };


    const handleDeleteNote = async (note) => {
        const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar esta nota?');
        if (confirmDelete) {
            try {
                console.log("Voy a eliminar la nota")
                await noteService.deleteNote(note.id);
                fetchData();
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const handleClosePopup = () => {
        setNoteToEdit(null); // Resetea la nota en edición
        setIsPopupVisible(false);
    };

    return (
        <div>
            <h1>Lista de Notas</h1>
            <div className="buttons-app">
                <button onClick={() => setShowArchived(!showArchived)}>
                    {showArchived ? 'Mostrar Notas Activas' : 'Mostrar Notas Archivadas'}
                </button>
                <button
                    onClick={() => setIsPopupVisible(true)}
                    style={{ display: showArchived ? 'none' : 'block' }}
                >
                    Crear Nota
                </button>
                {isPopupVisible && (
                    <CreateNotePopup
                        noteToEdit={noteToEdit}
                        onCreateNote={handleCreateNote}
                        onUpdateNote={handleUpdateNote}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
            <NoteList
                notes={notes}
                onEditNote={handleEditNote}
                onUpdateNote={handleUpdateNote}
                onArchiveNote={handleArchiveNote}
                onDeleteNote={handleDeleteNote}
            />
        </div>
    );
};

export default App;
