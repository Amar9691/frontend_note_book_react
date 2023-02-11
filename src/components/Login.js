import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const  Login  = (props)=>{

  const navigate = useNavigate();
  
  const [crdentials , setCrdentials] = useState({email:"",password:""});


  const handleChange  = (e)=>{
           
        setCrdentials({...crdentials,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
            
        e.preventDefault();

        let email = crdentials.email;
        let password = crdentials.password;
     
        const response =  await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({email,password}), 
        
        
        });
        
        const json = await response.json();

        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged In Successfully","success");
            navigate('/home');
        }
        else
        {
          props.showAlert("invalid credentails","danger");
        }
   
       
      
      
 

  };


  return (
    <form onSubmit={handleSubmit}>
      <h4 className='text-center text-info'>Login </h4>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" value={crdentials.email} onChange={handleChange} className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" onChange={handleChange} value={crdentials.password} className="form-control"  name="password" id="password"/>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" name="checkbx" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login