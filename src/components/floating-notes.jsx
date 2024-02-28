import React, { useContext } from 'react';
import { imagesRef } from '../App';
import FloatNote from './features/sub elements/float-note';

const FloatingNotes = ({ zIndex, setZindex }) => {
  const notes = useContext(imagesRef)

  return (
    <div className="floatingNotes">
      <div className="container">
        {notes.noteList.map(element => {
          if (element.open) {
            return (<FloatNote poX={element.poX} poY={element.poY} color={element.color} key={element.id} id={element.id} text={element.note} zIndex={zIndex} setZindex={setZindex} />)
          }
        })}

      </div>
    </div>
  )
}

export default FloatingNotes;