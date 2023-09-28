import ErrorComponent from "../../components/ErrorComponent";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const ErrorPage = () => {

  console.log('catch by ERROR PAGE!');

  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Navbar />
      <ErrorComponent />
      <Footer />
    </div>
  );
}

export default ErrorPage;
