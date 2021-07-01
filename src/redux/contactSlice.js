import {createSlice} from '@reduxjs/toolkit'


const contactSlice = createSlice({
    name:"contacts",
    initialState:[
        {name:'dasd',surname:'dasda'}
    ],
    reducers:{
        addContact: (state, action) => {
            const newContact = {
                name: action.payload.name,
                surname: action.payload.surname,
            }
            state.push(newContact)
        }
}
})

export const {addContact} = contactSlice.actions;

export default contactSlice.reducer;