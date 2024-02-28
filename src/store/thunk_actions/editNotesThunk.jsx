import { editedNotesAction } from "../reducers/edits";

export const updateNotes = (newNote, url) =>{
    return async(dispatch) =>{
        const setData = async() =>{
            const res = await fetch(url, {
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(newNote),
                method: "PUT"
            });

            const data = res.ok;

            return data;
        }

        try {
            const response = await setData();
            dispatch(editedNotesAction.setStatus({status: response}))
            dispatch(editedNotesAction.setErrorMsg({error: ''}))
        } catch (error) {
            dispatch(editedNotesAction.setErrorMsg({error: error.message}))
            throw new Error(error);
        }
    }
}
export const addNotes = (newNote, url) =>{
    return async(dispatch) =>{
        const setData = async() =>{
            const res = await fetch(url, {
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(newNote),
                method: "POST"
            });
            const data = res.ok;

            return data;
        }

        try {
            const response = await setData();
            dispatch(editedNotesAction.setStatus({status: response}))
            dispatch(editedNotesAction.setErrorMsg({error: ''}))
        } catch (error) {            
            dispatch(editedNotesAction.setErrorMsg({error: error.message}))
            throw new Error(error);
        }
    }
}

