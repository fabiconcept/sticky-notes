import {createSlice} from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "stickyNotes",
    initialState: {
        isPending: true,
        error: "",
        notes: []
    },
    reducers:{
        importNotes(state, action){
            const data = action.payload;
            state.notes = data.notes;
        },
        getErrors(state, action){
            const data = action.payload;
            state.error = data.error;
        },
        setPending(state, action){
            const data = action.payload;
            state.isPending = data.isPending;
        }
    }
})

export const notesAction = noteSlice.actions;