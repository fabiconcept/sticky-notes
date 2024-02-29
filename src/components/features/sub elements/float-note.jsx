import React from 'react'
import { useRef } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import { imagesRef } from '../../../App';
import NoteNav from './note-nav';
import { addNotes, updateNotes } from '../../../store/thunk_actions/editNotesThunk';
import ExtraMenu from './extra-Menu';

const FloatNote = ({zIndex, setZindex, color, text, id, poX, poY}) => {
    const [myIndex, setMyIndex] = useState(0);
    const [canMove, setCanMove] = useState(false);
    const [noteX, setNoteX] = useState(0);
    const [noteY, setNoteY] = useState(0);
    const noteDiv = useRef()
    const winHeight = (100 / window.innerHeight);
    const winWidth = (100 / window.innerWidth);
    const [exMenu, setExMenu] = useState(false);
    const dispatch = useDispatch();

    const noteInitial = useContext(imagesRef);
    const allNotes = noteInitial.noteList;
    const notesFunc = noteInitial.setNoteList;
    const listId = noteInitial.notesId;

    const [textContent, setTextContent] = useState(text);

    const thisNote = allNotes.filter(item => item.id === id);
    const toUpdate = thisNote[0];


    const handleClose = () =>{
        notesFunc(allNotes.map((item) =>{
            if (item.id === id) {
                return{
                    ...item, open: false
                }
            }
            return item;
        }))
    }

    const positionHandler = () =>{
        let positionX = noteDiv.current.offsetLeft;
        let positionY = noteDiv.current.offsetTop;

        notesFunc(allNotes.map((item) =>{
            if (item.id === id) {
                return{
                    ...item, poX: (positionX * winWidth), poY: (positionY * winHeight)
                }
            }
            return item;
        }))

        handleClose()
    }

    useEffect(()=>{
        const handleTextUpdate = ()=> {
            notesFunc(allNotes.map((item) =>{
                if (item.id === id) {
                    return{
                        ...item, note: textContent
                    }
                }
                return item;
            }))
        }
        handleTextUpdate();
    }, [textContent, allNotes, id, notesFunc]);



    useEffect(() => {
        if ((noteX * winWidth) > 5 && (noteX * winWidth) < 93) {
            noteDiv.current.style.left = `${(noteX * winWidth)+1}%`;
        }
        if ((noteY * winHeight) > 2.4 && (noteY * winHeight) < 75.5) {
            noteDiv.current.style.top = `${noteY * winHeight -1}%`;
        }
    }, [noteX, noteY, noteDiv, winHeight, winWidth]);
    
    useEffect(() => {
        if (poX > 0) {
            noteDiv.current.style.left = `${poX}%`;
        }
        if (poY > 0) {
            noteDiv.current.style.top = `${poY}%`;
        }
    }, [noteDiv, poY, poX]);

    useEffect(()=>{
        setZindex(myIndex);
    },[myIndex, setZindex]);

    useEffect(()=>{
        if (myIndex === zIndex) {
            if (listId.indexOf(id) >= 0) {
                dispatch(updateNotes(toUpdate, `http://localhost:8000/notes/${id}`));
            }else{
                dispatch(addNotes(toUpdate, `http://localhost:8000/notes/`));
            }
        }
      }, [textContent, myIndex, zIndex, toUpdate, id, dispatch, listId]);

    return (
        <div className={`floatNote ${color ? color : "yel"}`} ref={noteDiv} onClick={()=>setMyIndex(zIndex+1)} style={{zIndex: `${myIndex}`}}>
            <ExtraMenu allNotes={allNotes} color={color} id={id} notesFunc={notesFunc} setExMenu={setExMenu} exMenu={exMenu}/>
            <div className={`top ${color ? color : "yel"}`}>
                <NoteNav handleClose={positionHandler} setExMenu={setExMenu} setCanMove={setCanMove} color={color} setNoteX={setNoteX} canMove={canMove} setNoteY={setNoteY}/>
            </div>
            <textarea cols="30" placeholder='Take a note...' value={textContent} onChange={(e)=>setTextContent(e.target.value)} rows="10"></textarea>
        </div>
    )
}

export default FloatNote;