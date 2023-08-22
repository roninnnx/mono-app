import React, { useState, useEffect } from 'react';
import categoryService from "../services/categoryService";
import noteService from "../services/noteService";

const CreateNotePopup = ({ noteToEdit, onCreateNote, onUpdateNote, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title || '');
            setContent(noteToEdit.content || '');

            async function fetchCategories() {
                try {
                    const categories = await categoryService.fetchCategoriesForNote(noteToEdit.id);
                    setCategories(categories);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }

            fetchCategories();
        }
    }, [noteToEdit]);


    const handleAddCategory = async () => {
        if (categoryInput && !categories.includes(categoryInput)) {
            try {
                const categoryData = await categoryService.createCategory(categoryInput);
                setCategories([...categories, categoryData]);
                setCategoryInput('');

            } catch (error) {
                console.error('Error creating category:', error);
            }
        }
    };
    const handleRemoveCategory = (category) => {
        const updatedCategories = categories.filter((cat) => cat !== category);
        setCategories(updatedCategories);
    };

    const handleSaveNote = async () => {
        try {
            console.log("CATEGORIAS ", categories.map((category) => category));
            const updatedNote = {
                title,
                content,
                categories: categories.map((category) => category.id),
            };

            const updatedCategories = categories.map(category => ({ ...category }));

            if (noteToEdit) {
                await onUpdateNote(noteToEdit.id, updatedNote);
            } else {
                onCreateNote(updatedNote);
            }

            // Aquí es donde se realiza la solicitud PUT
            const putUrl = `http://127.0.0.1:3000/notes/${noteToEdit.id}/categories`;
            const putBody = {
                CategoryIds: categories.map((category) => category.id),
            };
            await fetch(putUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putBody),
            });

            setTitle('');
            setContent('');
            setCategories([]);
            setCategoryInput('');
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="popup">
            <h2>{noteToEdit ? 'Edit Note' : 'New Note'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div>
                <input
                    type="text"
                    placeholder="Categories"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
            <div className="category-list">
                {categories.map((category) => (
                    <div key={String(category.id)} className="category">
                        {category.name}
                        <button onClick={() => handleRemoveCategory(category)}>Delete</button>
                    </div>
                ))}
            </div>
            <button onClick={handleSaveNote}>{noteToEdit ? 'Save' : 'Create'}</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CreateNotePopup;
