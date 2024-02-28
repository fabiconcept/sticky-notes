import { notesAction } from "../reducers/notes";

export const getNoteList = (url) =>{
    return async(dispatch)=>{
        const fetchData = async() =>{
            const res = await fetch(url);
            const data = res.json();
            dispatch(notesAction.setPending({isPending: true}));


            return data;
        }

        try {
            const response = await fetchData();
            dispatch(notesAction.importNotes({notes: response}));
            dispatch(notesAction.getErrors({error: ""}));
            dispatch(notesAction.setPending({isPending: false}));
        } catch (error) {
            dispatch(notesAction.getErrors({error: error.message}));
            dispatch(notesAction.setPending({isPending: false}));
            throw new Error(error);
        }
    }
}