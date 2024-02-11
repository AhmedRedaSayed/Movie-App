import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'



export default function MovieDetails() {

  let {id , media_type} = useParams();
  const [moviesDetails, setMoviesDetails] = useState({});
  async function getMoviesDetails(id , mediaType)
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&langauge=en-US`)
    setMoviesDetails(data)
  }

  useEffect(()=>{

    getMoviesDetails(id , media_type)



  },[])
  return<>

  <div className="row py-5">
    <div className="col-md-3">
    {moviesDetails.poster_path?<img src={'https://image.tmdb.org/t/p/w500/'+moviesDetails.poster_path} className="w-100" alt="" />: 
               <img src={'https://image.tmdb.org/t/p/w500/'+moviesDetails.profile_path} className="w-100" alt="" />
               
}



    </div>
    <div className="col-md-9 ">
    
      <h2 className='h4'>{moviesDetails.title}{moviesDetails.name}</h2>
      <h2 className='h5 text-muted'>{moviesDetails.tagline}{moviesDetails.name}</h2>
      {moviesDetails.genres?.map((item) =>  <span className=' border border-1 rounded-pill border-info bg-info px-5  '> {item.name}</span>     )}
     {moviesDetails.vote_average?<div className='py-2'> Vote: {moviesDetails.vote_average?.toFixed(1)}</div>:''} 
      {moviesDetails.vote_count?<div className='py-2'> Vote count: {moviesDetails.vote_count}</div>:''}
      {moviesDetails.popularity?<div className='py-2'> Popularity: {moviesDetails.popularity}</div>:''}
      {moviesDetails.release_date?<div className='py-2'> Release Date: {moviesDetails.release_date}</div>:''}
      <h2 className='h5 text-muted'>{moviesDetails.overview}</h2>



    </div>
  </div>


  
  </>
}
