import React from 'react'
import { Link ,useLocation} from 'react-router-dom'


const Header = () => {

    const location = useLocation()

    return (
        <div className="header">
           <div>Contacts</div> 
           {location.pathname === "/" ? <Link className="link" to="/addItem">Add Contact</Link>
           : <Link className="link" to="/">Go back</Link>}

        </div>
    )
}

export default Header
