import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , logOut}) {
  return <>
  <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Noxe</a>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userData? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
       <li className="nav-item">
         < Link className="nav-link text-white" to="/home">Home</Link>
       </li>
       <li className="nav-item">
         < Link className="nav-link text-white" to="movies">Movies</Link>
       </li>
       <li className="nav-item">
         < Link className="nav-link text-white" to="people">People</Link>
       </li>
       <li className="nav-item">
         < Link className="nav-link text-white" to="tv">Tv</Link>
       </li>
      
       </ul>:''}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nave-item d-flex me-2">
        < a className="nav-link text-white" href="#"><i className='fab fa-facebook '></i></a>
          < a className="nav-link text-white" href="#"><i className='fab fa-twitter '></i></a>
          < a className="nav-link text-white" href="#"><i className='fab fa-instagram '></i></a>
          < a className="nav-link text-white" href="#"><i className='fab fa-spotify '></i></a>
          < a className="nav-link text-white" href="#"><i className='fab fa-youtube '></i></a>
        </li>
        
        {userData?
          <><li className="nav-item">
                <Link className="nav-link text-white" to="profile">Profile</Link>
              </li><li className="nav-item">
                  <Link className="nav-link text-white" onClick={logOut} to="">Logout</Link>

                </li></>
        
        
        :<>
        <li className="nav-item">

          < Link className="nav-link text-white" to="/">Login</Link>
        </li>
        <li className="nav-item">
          < Link className="nav-link text-white" to="/register">Register</Link>
        </li></>}
        
       
        </ul>
     
    </div>
  </div>
</nav></>
  
}
