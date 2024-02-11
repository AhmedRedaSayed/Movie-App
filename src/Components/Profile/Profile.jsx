import React from 'react'

export default function Profile({userData}) {

    let {first_name , last_name , age , email} = userData;
  return <>

  <h3>Name:{first_name} {last_name} </h3>
  <h3>Age:{age}</h3>
  <h3>Email:{email}</h3>

  
  </>
}

