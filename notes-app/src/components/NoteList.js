import React from 'react';

const NoteList = ({ notes, onEditNote, onArchiveNote, onDeleteNote }) => {

    return (
        <div>
            <h2>Notas</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <div className="buttons">
                            <button onClick={() => onEditNote(note)}>Editar</button>
                            <button onClick={() => onArchiveNote(note)}>Archivar</button>
                            <button onClick={() => onDeleteNote(note)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
