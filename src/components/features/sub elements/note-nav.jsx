import React, { useContext } from 'react'
import { imagesRef } from '../../../App';

const NoteNav = ({handleClose, setNoteY, setNoteX, setCanMove, canMove, color, setExMenu}) => {
    const images = useContext(imagesRef);

    const handleNoteMove = (e) =>{
        if (canMove) {
            setNoteX(e.clientX)
            setNoteY(e.clientY)
        }
    }

    return (
        <div className={`noteNav ${color ? color : "yel"}-solid`}>
            <div className="left">
                {/* <img src={images.plus} alt="" /> */}
            </div>
            <div className="right">
                <img src={images.ellipsis} onClick={()=>setExMenu(true)} alt="" />
                <img src={images.windowClose} alt="" onClick={handleClose} />
            </div>
            <div className="dragger" onMouseMove={e=>handleNoteMove(e)} onMouseDown={()=>setCanMove(!canMove)} onMouseUp={()=>setCanMove(false)}></div>
        </div>
    )
}

export default NoteNav;