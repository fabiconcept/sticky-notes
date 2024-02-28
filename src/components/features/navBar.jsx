import React from 'react';
import { useContext } from 'react';
import { imagesRef } from '../../App';

const NavBar = ({handleAddNote, setIsClicked, mainDiv, isClicked, setWinY, setWinX }) => {
  const images = useContext(imagesRef);
  const mouseMoveHandler = (e)=>{
    if (isClicked) {
      setWinX(e.clientX)
      setWinY(e.clientY)
    }
  }

  return (
    <div className="NavBar">
      <div className="left">
        <img src={images.plus} alt="" onClick={handleAddNote} />
      </div>
      <div className="right">
        <img src={images.wrench} alt="" />

        <img src={images.windowClose} alt="" />
      </div>
      <div className="handle" onMouseMove={(e)=>mouseMoveHandler(e)} onMouseDown={() => setIsClicked(true)} onMouseUp={() => setIsClicked(false)} onMouseLeave={() => setIsClicked(false)}></div>
    </div>
  )
}

export default NavBar;