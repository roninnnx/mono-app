// services/createNoteService.js
const API_URL = 'http://190.14.157.20:3001/notes/';

async function createNote(noteData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}


async function updateNote(noteId, updatedNote) {
    try {
        console.log("NOTE ID ES", noteId)
        const response = await fetch(`${API_URL}${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedNote),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

export default {
    createNote,
    updateNote,  // Export the updateNote function
};
