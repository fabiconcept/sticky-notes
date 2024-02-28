import React from 'react';
import { useContext } from 'react';
import { imagesRef } from '../../App';
import Note from './sub elements/note';

const Notes = () => {
    const noteInitial = useContext(imagesRef);
    const allNotes = noteInitial.noteList;
    const notesFunc = noteInitial.setNoteList;

    
    return (
        <div className="notes">
            {allNotes.map((element) => (
                <Note id={element.id} key={element.id} notesFunc={notesFunc} allNotes={allNotes} time={element.date} text={element.note} cl={element.color} isOpen={element.open} />
            ))}
        </div>
    )
}

export default Notes;