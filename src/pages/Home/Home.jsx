import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'

const Home = () => {
  return (
    <div className="home">
        <Navbar />
        <div className='hero'>
            <img src={hero_banner} alt="" className='banner-img' />
            <div className='hero-caption'>
                <img src={hero_title} alt="" className='caption-img' />
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus voluptatibus quidem distinctio delectus illum? Quibusdam id unde accusantium provident recusandae pariatur ab, soluta sequi non. Eum, exercitationem! Cupiditate, tempora amet.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Home