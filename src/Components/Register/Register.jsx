import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from "joi";




export default function Register() {
  


  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:''
  });

  function getUserData(eventInfo)
  {

    let myUser ={...user};
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
    

  }

   async function sendRegisterData()
  {
     let {data} = await axios.post(`https://route-movies-api.vercel.app/signup` , user);
     console.log(data)
     if(data.message == 'success')
     {
      setIsLoading(false)
      navigate('/')
      
     }
     else
     {
      setIsLoading(false)

      setError(data.message)

     }
  }

  function submitRegister(e)
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
      sendRegisterData();

    }


  }


  function validation()
  {
   let scheme = Joi.object({
      first_name:Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
      last_name:Joi.string().min(3).max(10).required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      age:Joi.number().min(18).max(80).required(),
      password:Joi.string().pattern(/[A-Z][a-z]{4,8}/)

    });
    return scheme.validate(user, {abortEarly:false});
  }


  
  return <>

  {errorList.map((err , index)=> {
    if(err.context.label === 'password')
    {
      return <div key={index} className="text-danger" >Password Invalid At least one uppercase character </div>
    }
    else if(err.context.label === 'first_name')
    {
      return <div key={index} className="text-danger" > FirstName should start with uppercase character and at least 3 characters </div>

    }
    else
    {
     return  <div key={index} className="text-danger" >{err.message}</div>
    }
  } )}
  
  
{error.length > 0? <div className="text-danger" >{error}</div>:""}
  <form onSubmit={submitRegister}>
    <label htmlFor="first_name">FirstName:</label>
    <input onChange={getUserData} type="text" className='form-control my-input my-2' name='first_name' id='first_name' />
    <label htmlFor="last_name">LastName:</label>
    <input onChange={getUserData} type="text" className='form-control my-input my-2' name='last_name' id='last_name' />
    <label htmlFor="age">Age:</label>
    <input onChange={getUserData} type="number" className='form-control my-input my-2' name='age' id='age' />
    <label htmlFor="email">Email:</label>
    <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
    <label htmlFor="password">Password:</label>
    <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />

    <button type='submit' className='btn btn-info'>
      {isLoading == true ? <i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
  </form>
  
  
  
  
  
  
  </>
}
