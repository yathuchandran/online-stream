import React, { useEffect, useState } from 'react'
import './Banner.css';
import {API_KEY,imageUrl} from '../constants/constants'
import axios from '../../axios';

function Banner() {
  const [movie,setMovie]= useState()

  useEffect(()=>{
   axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
    setMovie(response.data.results);
    console.log(response.data.results);
    })
  },[])

  const getRandomMovie = () => {
    if (!movie || movie.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * movie.length);
    return movie[randomIndex];
  };

  const movies = getRandomMovie();
  return (
    
    <div 
    style={{backgroundImage:`url(${movies ? imageUrl+movies.backdrop_path :""})`}}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{ movies ? movies.title :""}</h1>
            <div className='banner_buttons'>
                <button className='button'>play </button>
                <button className='button'> My list</button>

            </div>
            <h1 className='discription'>{ movies ? movies.overview :""} </h1>
        </div>
      <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner
