import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ContactDetails = () => {

    const {id} = useParams();

    const [detail,setDetail] = useState('');
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const getContacts = async () => {
          const contactFromJson = await fetchContact()
          setDetail(contactFromJson)
          setLoading(false)
        }
  
        getContacts()
      },[])
  
      const fetchContact = async () =>{
        const res = await fetch('http://localhost:8000/contacts/' + id)
        const data = await res.json()
        
        return data
      }

    return (
        <div className="contact-details">
          <div className="contact-detail-for">Information for {detail.name} {detail.surname} :</div>  
          <div>{loading && <div>Loading...</div>}</div>
          <div>{detail.details === '' ? 'No information..' : detail.details}</div> 
        </div>
    )
}

export default ContactDetails
