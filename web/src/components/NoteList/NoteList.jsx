import React, { useEffect, useState, useRef } from 'react';
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../../api/notesAPI';
import NoteForm from '../NoteForm/NoteForm';

import styles from './noteList.module.css';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const listEndRef = useRef(null);

  const scrollToBottom = () => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    loadNotes();
  }, []);
  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever notes change
  }, [notes]);

  const loadNotes = async () => {
    try {
      const notesData = await fetchNotes();
      setNotes(notesData.data.note);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSave = async (note) => {
    if (note.id) {
      await updateNote(note.id, note.content);
    } else {
      await createNote(note.content);
    }
    loadNotes();
    setEditingNote(null);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  if (error) {
    return <p>Error loading notes: {error}</p>;
  }

  return (
    <div>
      <ul className={styles.container}>
        {notes.map((note) => (
          <li key={note.id}>
            <div className='noteContent'>{note.content}</div>
            <div>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => handleEdit(note)}
              >
                Edit
              </button>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        <div ref={listEndRef} />
      </ul>
      <NoteForm
        note={editingNote}
        onSave={handleSave}
        isEditing={!!editingNote}
      />
    </div>
  );
};

export default NoteList;
