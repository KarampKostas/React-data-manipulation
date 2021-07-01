import AddContactItem from "./components/AddContactItem";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import ContactDetails from "./components/ContactDetails";
import EditContactItem from "./components/EditContact";

function App() {

  const [contacts,setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults,setSearchResults] = useState('')

    // useEffect(() =>{
    //     fetch('http://localhost:8000/contacts')
    //     .then(res => res.json())
    //     .then(data => setContacts(data))
    // },[])

    useEffect(() => {
      const getContacts = async () => {
        const contactsFromJson = await fetchContacts()
        setContacts(contactsFromJson)
      }

      getContacts()
    },[])

    const fetchContacts = async () =>{
      const res = await fetch('http://localhost:8000/contacts')
      const data = await res.json()

      return data
    }
    

    const searchHandler = (searchTerm) =>{
      if(searchTerm !== ""){
        const newContactList = contacts.filter((contact) =>{
          return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSearchResults(newContactList);
       }
       else{
        setSearchResults(contacts)
       }
    }

  return (
    <div>
      <Router>
         <Header/>
         <Switch>
           <Route exact path='/'>
             <ContactList contacts={searchTerm.length < 1 ?  contacts : searchResults}  setContacts={setContacts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchHandler={searchHandler}/>
           </Route>
            <Route exact path='/addItem'>
              <AddContactItem contacts={contacts} setContacts={setContacts} />
            </Route>
            <Route  path="/contacts/:id">
             <ContactDetails />
           </Route>
           <Route exact path='/edit/:id'>
              <EditContactItem contacts={contacts} setContacts={setContacts}/>
            </Route>
         </Switch>
        
      </Router>
     
    </div>
  );
}

export default App;
