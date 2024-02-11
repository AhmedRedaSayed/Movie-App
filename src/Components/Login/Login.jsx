import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from "joi";
import { Link } from 'react-router-dom';





export default function Login({saveUserData}) {
  


  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
  
    email:'',
    password:''
  });

  function getUserData(eventInfo)
  {

    let myUser ={...user};
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
    

  }

   async function sendLoginData()
  {
     let {data} = await axios.post(`https://route-movies-api.vercel.app/signin` , user);
     console.log(data)
     if(data.message === 'success')
     {
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      saveUserData();
      navigate('/home');
      
     }
     else
     {
      setIsLoading(false);

      setError(data.message);

     }
  }

  function submitLogin(e)
  {

    e.preventDefault();
    setIsLoading(true);
    let validate = validation()
    if(validate.error)
    {
      setIsLoading(false);
      setErrorList(validate.error.details)

    }
    else
    {
      sendLoginData();

    }


  }


  function validation()
  {
   let scheme = Joi.object({
      
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(/^[A-Z][a-z]{4,8}/)

    });
    return scheme.validate(user, {abortEarly:false});
  }


  
  return <>

  {errorList.map((err , index)=> {
    if(err.context.label === 'password')
    {
      return <div key={index} className="text-danger" >Password Invalid</div>
    }
    else
    {
     return  <div key={index} className="text-danger" >{err.message}</div>
    }
  } )}
  
  
{error.length > 0? <div className="text-danger" >{error}</div>:""}
  <form onSubmit={submitLogin}>
    <label htmlFor="email">Email:</label>
    <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
    <label htmlFor="password">Password:</label>
    <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />

    <button type='submit' className='btn btn-info'>
      {isLoading === true ? <i className='fas fa-spinner fa-spin'></i>:'Login'}</button>

      <p>Don't Have An Account <Link to="register">SignUp</Link></p>
  </form>
  
  
  
  
  
  
  </>
}
