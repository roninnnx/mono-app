
const API_URL = 'http://190.14.157.20:3001/notes/';

async function fetchNotes(showArchived) {
    try {
        console.log(showArchived)
        const response = await fetch(`${API_URL}list/?archived=${showArchived}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

async function archiveNote(noteId) {
    try {
        const response = await fetch(`${API_URL}/archived/${noteId}`, {
            method: 'PUT',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error archiving note:', error);
        throw error;
    }
}

async function deleteNote(noteId) {
    try {
        const response = await fetch(`${API_URL}${noteId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error archiving note:', error);
        throw error;
    }
}

export default {
    fetchNotes,
    archiveNote,
    deleteNote
};
