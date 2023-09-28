import { Link } from 'react-router-dom';
import HomeBanner from '../../assets/imgs/home-banner.jpg';
import './styles.css';

const Home = () => {
  return (
    <div className='text-center' id="home-container">
      <img src={ HomeBanner } alt="Home banner" className="img-fluid mb-4 w-100" />
      <Link className='btn btn-primary mb-4 fw-bold fs-4' to={"animes"}>Click here to see the best animes</Link>
    </div>
  );
}

export default Home;
