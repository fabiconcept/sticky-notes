import React, { useContext } from 'react';
import { imagesRef } from '../../App';

const SearchTool = () => {
    const images = useContext(imagesRef);
    return (
        <div className="searchTool">
            <input type="text" placeholder='Search...'/>
            <img src={images.search} alt="" />
        </div>
    )
}

export default SearchTool;