import React from 'react';
import { useContext } from 'react';
import { imagesRef } from '../../../App';

const Note = ({time, isOpen, id, allNotes, notesFunc, text, cl}) => {
    const images = useContext(imagesRef);

    const handleOpen = () =>{
        notesFunc(allNotes.map((item) =>{
            if (item.id === id) {
                return{
                    ...item, open: !isOpen
                }
            }
            return item;
        }))
    }

    return (
        <div className={`note ${cl === "" ? "yel": cl} ${isOpen && "open"}`} onClick={handleOpen}>
            <div className="cover"></div>
            <div className="time">
                <span>{time}</span>
                <img src={images.ellipsis} alt="" />
            </div>
            <span>{text ? text : "Take a note..."}</span>
        </div>
    )
}

export default Note;