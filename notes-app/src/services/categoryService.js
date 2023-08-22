// categoryService.js
const API_URL = 'http://190.14.157.20:3000/notes/';

async function fetchCategoriesForNote(noteId) {
    try {
        const response = await fetch(`${API_URL}/${noteId}`);
        const data = await response.json();
        return data.Categories.map(category => ({ id: category.id, name: category.name }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

const createCategory = async (name) => {
    try {
        const response = await fetch('http://190.14.157.20:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data; // Devuelve la respuesta con el ID de la categoría si se creó exitosamente
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message); // Lanza un error con el mensaje de error del servidor
        }
    } catch (error) {
        throw error;
    }
};


export default {
    fetchCategoriesForNote,
    createCategory
};
