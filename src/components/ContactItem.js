import React from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditIcon from '@material-ui/icons/Edit';

const ContactItem = ({contact,contacts,setContacts}) => {

    const deleteItem = async (id) => {
       await fetch(`http://localhost:8000/contacts/${id}`,{
        method:"DELETE",
      })

      setContacts(contacts.filter(contact => contact.id !== id))

    }

    return (
        <div className="list" >
            <div className="contact-content" >
                <div>
                    <div>{contact.name}</div>
                    <div className="surname">{contact.surname}</div>
                </div>
                <div className="info">
                    <Link to={`/contacts/${contact.id}`} className="info-link"><InfoOutlinedIcon/></Link>
                    <Link to={`/edit/${contact.id}`} className="info-edit"><EditIcon/></Link>
                    <button onClick={() => deleteItem(contact.id)} className="btn"><DeleteIcon/></button>
                </div>
                
            </div>
        </div>
    )
}
export default ContactItem
