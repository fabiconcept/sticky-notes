import React, { useMemo, useState } from 'react';
import ControlCenter from './components/control-center';
import plus from './images/plus.svg';
import check from './images/check.svg';
import search from './images/search.svg';
import wrench from './images/wrench.svg';
import trash from './images/trash-alt.svg';
import list from './images/list.svg';
import ellipsis from './images/ellipsis-h.svg';
import windowClose from './images/window-close.svg';
import FloatingNotes from './components/floating-notes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteList } from './store/thunk_actions/noteThunk';
import useFetch from './useFetch';

export const imagesRef = React.createContext();

const App = () => {
  const [zIndex, setZindex] = useState(3);
  const dispatch = useDispatch();
  const { responseData, errorMessage, isLoading } = useFetch("http://localhost:8000/Notes");

  useEffect(() => {
    console.log({
      responseData, errorMessage, isLoading
    });
  }, [responseData, errorMessage, isLoading]);

  useEffect(()=>{
    dispatch(getNoteList("http://localhost:8000/Notes"));

  }, [dispatch]);
  
  const notesData = useSelector (state => state.notesList);
  const {isPending, error, notes} = notesData;

  const notesId = useMemo(()=>{
    const newArray = [];
    if (!notes) return newArray;

    notes.forEach(element => {
      newArray.push(element.id);
    });

    return newArray;
  }, [notes]);


  const [noteList, setNoteList] = useState([]);

  useEffect(()=>{
    if (!isPending) return;

    setNoteList(notes);
  },[isPending, notes]);

  
  
  return (
    <imagesRef.Provider value={{ plus, check, search, wrench, list, trash, notesId, ellipsis, windowClose, noteList, isPending, setNoteList }}>
      <div className="app">
        {!isPending && error === "" && <ControlCenter zIndex={zIndex} setZindex={setZindex}/>}
        {!isPending && error === "" && <FloatingNotes zIndex={zIndex} setZindex={setZindex}/>}
        {isPending && <p>Loading</p>}
        {!isPending && error && <p>{error}</p>}
      </div>
    </imagesRef.Provider>
  )
}

export default App;