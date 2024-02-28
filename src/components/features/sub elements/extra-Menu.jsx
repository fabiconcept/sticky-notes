import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { imagesRef } from '../../../App';

const ExtraMenu = ({exMenu, setExMenu, color, allNotes, id, notesFunc}) => {
    const images = useContext(imagesRef);
    const [thisColor, setThisColor] = useState(0)
    
    useEffect(()=>{
        switch (color) {
            case "yel":
                setDivColor(0);
                break;
            case "gre":
                setDivColor(1);
                break;
            case "pin":
                setDivColor(2);
                break;
            case "pur":
                setDivColor(3);
                break;
            case "blu":
                setDivColor(4);
                break;
            case "ash":
                setDivColor(5);
                break;
            case "dark":
                setDivColor(6);
                break;
        
            default:
                setDivColor(0);
                break;
        }
    }, [])

    const [divColor, setDivColor] = useState(0);

    useEffect(()=>{
        setThisColor(divColor)
    },[divColor])

    const handleTextUpdateColor = ()=> {
        let activeColor;
        switch (divColor) {
            case 0:
                activeColor = 'yel'
                break;
            case 1:
                activeColor = 'gre'
                break;
            case 2:
                activeColor = 'pin'
                break;
            case 3:
                activeColor = 'pur'
                break;
            case 4:
                activeColor = 'blu'
                break;
            case 5:
                activeColor = 'ash'
                break;
            case 6:
                activeColor = 'dark'
                break;
        
            default:
                activeColor = 'yel'
                break;
        }
        
        notesFunc(allNotes.map((item) =>{
            if (item.id === id) {
                return{
                    ...item, color: activeColor
                }
            }
            return item;
        }))
    }

    useEffect(()=>{
        handleTextUpdateColor()
    },[divColor])

    return (
        <div className={`extraMenu ${exMenu && "active"}`} onMouseLeave={()=>setExMenu(false)}>
            <div className="colortray">
                <div className={`${thisColor === 0 && "active"}`} onClick={()=>setDivColor(0)}><img src={images.check} alt="" /></div>
                <div className={`${thisColor === 1 && "active"}`} onClick={()=>setDivColor(1)}><img src={images.check} alt="" /></div>
                <div className={`${thisColor === 2 && "active"}`} onClick={()=>setDivColor(2)}><img src={images.check} alt="" /></div>
                <div className={`${thisColor === 3 && "active"}`} onClick={()=>setDivColor(3)}><img src={images.check} alt="" /></div>
                <div className={`${thisColor === 4 && "active"}`} onClick={()=>setDivColor(4)}><img src={images.check} alt="" /></div>
                <div className={`${thisColor === 5 && "active"}`} onClick={()=>setDivColor(5)}><img src={images.check} alt="" /></div>
                <div className={`${thisColor === 6 && "active"}`} onClick={()=>setDivColor(6)}><img src={images.check} alt="" /></div>
            </div>
            <div className="below">
                <div className="left">
                    <img src={images.list} alt="" />
                    <span>Note List</span>
                </div>
                <div className="right"><img src={images.trash} alt="" /></div>
            </div>
        </div>
    )
}

export default ExtraMenu;