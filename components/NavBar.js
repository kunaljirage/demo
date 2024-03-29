import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
 
 <Link to="/" className="navbar-brand" >Expenses Tracker</Link>
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>

 <div className="collapse navbar-collapse" id="navbarSupportedContent">
   <ul className="navbar-nav mr-auto">
   <li className="nav-item active">
     <Link to="/" className="nav-link" >Home</Link>
    
     </li>
   <li className="nav-item active">
     <Link to="/home_expenses" className="nav-link" >Home Expenses</Link>
    
     </li>
     <li className="nav-item active">
     <Link to="/medical_expenses" className="nav-link" >Medical Expenses</Link>
    
     </li>
     <li className="nav-item active">
     <Link to="/tour_expenses" className="nav-link" >Tour Expenses</Link>
    
     </li>
   
   </ul>
  
 </div>
</nav>
    )
}
