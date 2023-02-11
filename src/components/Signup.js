import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props)=>{

  const [user, setUser]  = useState({name:"",email:"",password:""});
  const navigate = useNavigate();


  const handleChange = (e)=>{

    setUser({...user,[e.target.name]: e.target.value});
      
  };

  const handleSignup = async(e)=>{

       e.preventDefault();

       const response = await fetch('http://localhost:5000/api/auth/signup',{
                          method:"POST",
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          mode:'cors',
                          referrerPolicy:'no-referrer',
                          body:JSON.stringify({name:user.name,email:user.email,password:user.password}),

                         });

                         const json = await response.json();

                         console.log(json);
                         if(json.success)
                         {
                             localStorage.setItem('token',json.authToken);
                             props.showAlert("your Account Created Successfully","success");
                             navigate('/home');
                         }
                         else
                         {
                            props.showAlert("invalid credentails","danger");
                         }
                    
                        
                       
                       
                  
                 
         

  };

  return (
    <form onSubmit={handleSignup}>
    <h4 className='text-center text-info'>Register </h4>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" required minLength={4} onChange={handleChange} value={user.name} className="form-control" name="name" id="name" />
      
    </div>
    <div className="mb-3">
     <label htmlFor="email" className="form-label">Email address</label>
     <input type="email" required  onChange={handleChange} value={user.email} className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
       <label htmlFor="password" className="form-label">Password</label>
       <input type="password" required minLength={8} onChange={handleChange} value={user.password} name="password" className="form-control" id="password"/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" required className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Accept Term and Condition</label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  )
}

export default Signup