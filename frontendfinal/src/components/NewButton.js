import React from 'react'
import { Link } from 'react-router-dom'


const NewButton = () => {
    
    return (
        <Link to={'/addwish'} >
          
        <div className="blackButton"> 
            Lägg till
        </div>
        </Link>
    )
}

export default NewButton