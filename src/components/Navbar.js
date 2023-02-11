import React, { useEffect } from 'react';
import { Link,useLocation, useNavigate } from "react-router-dom";
export default function Navbar(props) {

  const navigate  = useNavigate();

  let location = useLocation();

  const handleLogout = ()=>{
     
     localStorage.removeItem('token');
     navigate('/login');
     props.showAlert("Logout Successfully","success");

      

  };

  useEffect(() => {
      console.log(location.pathname);
  }, [location]);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
     <div className="container-fluid">
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <Link className="navbar-brand" to="index.html">Amar.in</Link>
       <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           <li className="nav-item">
             <Link className={`nav-link ${location.pathname === '/home' ? 'active':'' }`} aria-current="page" to="/home">Home</Link>
           </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active':'' }`} to="/about">About</Link>
            </li>
            <li className="nav-item">
             <Link className={`nav-link ${location.pathname === '/contact' ? 'active':'' }`} to="/contact" >Contact</Link>
            </li>
          </ul>
           {!localStorage.getItem('token') ?
           <form className="d-flex">
            <Link className="btn btn-outline-info mx-1" to="/login">Login</Link>
            <Link className="btn btn-outline-danger mx-1" to="/signup">Register</Link>
           </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
          </div>
  </div>
</nav>
    </>
  )
}
