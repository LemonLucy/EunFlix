import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef,useEffect } from 'react'

const TitleCards = () => {
const cardsRef =useRef();

console.log('TitleCards: 컴포넌트 렌더링');

const handleWheel = (event) =>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {
    console.log('useEffect: 이벤트 리스너 등록');

    cardsRef.current.addEventListener('wheel', handleWheel);

    return () => {
        console.log('useEffect: 이벤트 리스너 정리'); // (3) 컴포넌트 언마운트 시
        cardsRef.current.removeEventListener('wheel', handleWheel);
      };
},[])

  return (
    <div className='titlecards'>
        <h2>Popular on Netflix</h2>
        <div className="card-list" ref={cardsRef}>
            {cards_data.map((card,index)=>{
                return <div className="card" key={index}>
                    <img src={card.image} alt="" />
                    <p>{card.name}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards