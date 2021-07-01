import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    formInput:{
        margin:'0.4rem'
    },
    btnForm:{
        margin: 'auto'
    }
})

const AddContactItem = ({contacts,setContacts}) => {

    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [details,setDetails] = useState('')
    const history = useHistory();
    const classes = useStyles();

   

    const addContact = async (e) => {
        e.preventDefault()

        if(name ==='' || surname === ''){
            alert('Name and surname should not be blank')
            return
        }

        const contact = {name,surname,details}

        const res = await fetch('http://localhost:8000/contacts',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(contact)
      })

      const data = await res.json()

        setContacts([...contacts,data])

        setName('')
        setSurname('')
        setDetails('')
        history.push('/')
    }



    return (
        <div className="form">
            <form className="form-control" 
            onSubmit={addContact}>
                <TextField
                    className={classes.formInput}
                    label="name"
                    variant="outlined"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    className={classes.formInput}
                    label="Surname"
                    variant="outlined"
                    value={surname} 
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                    className={classes.formInput}
                    label="Details"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={details} 
                    onChange={(e) => setDetails(e.target.value)}
                />
                
                <Button 
                    type="submit"
                    variant="contained"
                    endIcon={<AddIcon/>}
                    className={classes.btnForm}
                >Add</Button>
            </form>
        </div>
    )
}

export default AddContactItem
