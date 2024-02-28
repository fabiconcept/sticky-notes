import {createSlice} from '@reduxjs/toolkit';

export const editedNotesSlice = createSlice({
    name: "editedNotes",
    initialState:{
        status: false,
        error: ""
    },
    reducers:{
        setStatus(state, action){
            const data = action.payload;
            state.status = data.status;
        },
        setErrorMsg(state, action){
            const data = action.payload;
            state.status = data.error;
        }
    }
})

export const editedNotesAction = editedNotesSlice.actions;