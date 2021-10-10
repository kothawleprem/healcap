import React,{useState ,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import { UserContext } from "../App";


function Login2() {

  const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const loginUser = async (e) => {
     e.preventDefault();
     const res = await fetch('/signin',{
       method:"POST",
       headers:{
         "Content-Type" : "application/json"
       },
       body:JSON.stringify({
         email,
         password
       })
     });
     
     const data = res.json();
  
     if  (res.status === 400 || !data) {
       window.alert("Invalid Credentials")
     }else {
      dispatch({type:"USER", payload:true})
      window.alert("Login Succefull");
  
     history.push("/");
  
     }
    }

    return (
        <div>
        <br></br><br></br><br></br>
        <div className="container">
        <div className="info-box">
        <center>
            <h1>Login</h1>
            <br></br><br></br>
            <input type="text" placeholder="Enter username" className="form-control form-control-sm" required    id="name"
             
              value={email}
              onChange={(e) => setEmail(e.target.value)}></input>
            <br></br>
  
            <input type="password" placeholder="Enter password" className="form-control form-control-sm" required   name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
             ></input>
            <br></br><br></br>
            <input type="submit" class="btn btn-outline-dark btn-sm" value="Login" onClick={loginUser}></input>
        </center>
        </div>
        </div>
        </div>
    )
}

export default Login2;