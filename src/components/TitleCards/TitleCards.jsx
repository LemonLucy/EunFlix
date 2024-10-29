import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef,useEffect, useState } from 'react'

const TitleCards = ({title, category}) => {

const cardsRef =useRef();
const [apiData, setApiData]=useState([])

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWVlMjg0YmU3NmNlMDAxOWI4ZDNkZmI2MjZlNzU0MyIsIm5iZiI6MTczMDE3ODA0Ny42NzY3MTYsInN1YiI6IjY3MjA2OGU0MjdiZDU3ZDkxZjYzNGRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X4D7gfCXtBacxXh_xVjvQZsas-u8oxkUkp-AAs0S878'
    }
  };


const handleWheel = (event) =>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='titlecards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
                return <div className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards