import {configureStore} from "@reduxjs/toolkit";
import { editedNotesSlice } from "./reducers/edits";
import { noteSlice } from "./reducers/notes";

const store = configureStore({
    reducer:{
        notesList: noteSlice.reducer, editedNote: editedNotesSlice.reducer
    }
})

export default store;