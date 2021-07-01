import ContactItem from './ContactItem'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const ContactList = ({contacts,setContacts,searchTerm,setSearchTerm,searchHandler}) => {

    const getSearchTerm = (term) => {
        setSearchTerm(term);
        searchHandler(term);
    }

    return (
        <div >
            <div className="search-bar">
                
               <TextField
                    className="searca-bar-field"
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    value={searchTerm}
                    
                    onChange={(e) => getSearchTerm(e.target.value)}
            />
            </div>

            
            

            {contacts && contacts.map(contact => (
                <ContactItem 
                key={contact.id}
                contact={contact} 
                contacts={contacts} 
                setContacts={setContacts} />
            ))}

            
        </div>
    )
}

export default ContactList
