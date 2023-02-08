import ErrorComponent from "../../components/ErrorComponent";
import Navbar from "../../components/Navbar";

const ErrorPage = () => {

  console.log('catch by ERROR PAGE!');

  return (
    <>
      <Navbar />
      <ErrorComponent />
    </>
  );
}

export default ErrorPage;
