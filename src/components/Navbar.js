import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo2 from  "../images/healcaplogo.png";
import { UserContext } from "../App";

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return(
        <>

<li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
     
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/preauth">preauth</NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">logout</NavLink>
        </li>

    
        </>
      )
    } else {
      return (
        <>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
     
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">login</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/registration">Registration</NavLink>
        </li>
        </>
      )
    }

  }
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">    
    <NavLink className="navbar-brand" to="/"> <img src={logo2} alt="nahi aaya" />
    </NavLink>
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0 ">


      <RenderMenu />

        {/* <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
     
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">login</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">logout</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/preauth">preauth</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/registration">Registration</NavLink>
        </li>
      */}
      </ul>
      
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
