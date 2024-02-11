import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'
export default function Movies() {

  const [trendingMovies, setTrendingMovies] = useState([]);


  async function getTrending()
{
   let {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=f1aca93e54807386df3f6972a5c33b50`);
   setTrendingMovies (data.results);

}

getTrending()



  return <>

<div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr w-25 mb-3"></div>
      <h2 className='h4'>Trending Movies <br /> To Watch Right Now</h2>
      <p className='text-muted py-2'>Most Watched Movies Right Now</p>
      <div className="brdr w-100 mt-3"></div>
      </div>
   
        
      
    </div>
    {trendingMovies.map((item , index) => <MediaItem key={index} item={item}/>)}
  </div>


  </>

}