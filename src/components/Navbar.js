import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

function Navbar() {  
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    Navigate('/login'); // Redirect to login
  };
  return (  
    <div className="navbar">  
      <h1>Fitness Tracker 🦸♀️</h1> 
      <Link to="/calendar" className="nav-link">Calendar</Link> 
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>  
  );  
}  



export default Navbar;  