import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { imagesRef } from '../App';
import NavBar from './features/navBar';
import Notes from './features/notes';
import SearchTool from './features/search-tool';

const ControlCenter = ({ zIndex, setZindex }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [winX, setWinX] = useState(0);
  const [myIndex, setMyIndex] = useState(0);
  const [winY, setWinY] = useState(0);
  const mainDiv = useRef();

  const noteInitial = useContext(imagesRef);
  const allNotes = noteInitial.noteList;
  const notesFunc = noteInitial.setNoteList;

  useEffect(() => {
    const winHeight = (100 / window.innerHeight);
    const winWidth = (100 / window.innerWidth);


    if (winX > 175 && (winX * winWidth) < 86.2) {
      mainDiv.current.style.left = `${(winX * winWidth)}%`;
    }
    if (winY > 39 && (winY * winHeight) < 35.8) {
      mainDiv.current.style.top = `${winY * winHeight}%`;
    }
  }, [winX, winY])

  useEffect(() => {
    setZindex(myIndex);
  }, [myIndex])

  const handleAddNote = () => {
    notesFunc([...allNotes, { note: "", id: (Math.random()), date: "Today", open: true, color: "" }])
  }

  return (
    <div className={`controlCenter ${isClicked && "clicked"} ${zIndex === myIndex && "hover"}`} onClick={() => setMyIndex(zIndex + 1)} ref={mainDiv} style={{ transition: `${isClicked ? "none" : ".25s ease-in-out"}`, zIndex: `${myIndex > 0 ? myIndex : ""}`}}>
      <NavBar handleAddNote={handleAddNote} isClicked={isClicked} setIsClicked={setIsClicked} mainDiv={mainDiv} setWinY={setWinY} setWinX={setWinX} />
      <label>Sticky Notes</label>
      <SearchTool />
      <Notes />
      <div className="bot-bar"></div>
      <div className="disable" aria-disabled></div>
    </div>
  )
}

export default ControlCenter;