import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles({
    formInput:{
        margin:'0.4rem'
    },
    btnForm:{
        margin: 'auto'
    }
})

const EditContactItem = ({contacts,setContacts}) => {

    

    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [details,setDetails] = useState('')
    const {id} = useParams();
    const classes = useStyles();
    const history = useHistory()
    
    
    useEffect(() => {
        const getContacts = async () => {
          const contactFromJson = await fetchContact()
          
           const {name,surname,details} = contactFromJson;
           setName(name)
           setSurname(surname)
           setDetails(details)
           
        }
        getContacts()
      },[])
  
      const fetchContact = async () =>{
        const res = await fetch('http://localhost:8000/contacts/' + id)
        const data = await res.json()
        
        return await data
      }

    const updateContact = async (e) => {
        e.preventDefault()

        if(name ==='' || surname === ''){
            alert('Name and surname should not be blank')
            return
        }

        const editContact = {name,surname,details}

        const res = await fetch(`http://localhost:8000/contacts/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(editContact)
      })

      const data = await res.json()
      
       setContacts(contacts.map(contact => {
        return contact.id === data.id ? {...data} : contact;
    }))

        history.push('/')
    }



    return (
        <div className="form">
            <form className="form-control" 
            onSubmit={updateContact}>
                <TextField
                    className={classes.formInput}
                    label="Name"
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
                    variant="outlined"
                    label="Details"
                    multiline
                    rows={4}
                    value={details} 
                    onChange={(e) => setDetails(e.target.value)}
                />
                
                <Button 
                    type="submit"
                    
                    variant="contained"
                    endIcon={<UpdateIcon/>}
                    className={classes.btnForm}
                >Update</Button>
            </form>
        </div>
    )
}

export default EditContactItem
