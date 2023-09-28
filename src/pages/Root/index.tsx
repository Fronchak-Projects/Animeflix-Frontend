import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const Root = () => {

  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
