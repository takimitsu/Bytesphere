import './App.css';
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import splashLogo from './assets/splashlogo.png';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Courses from './pages/courses/Courses';

function App() {
  useEffect(() => {
    document.title = 'Bytesphere';
  }, []);

  return (
    //<div className="App">
    //  <Navbar />
    //  <div className="container mt-5">
    //    <div className="row d-flex justify-content-center align-items-center">
    //      <div className="col-md-6 splash-image d-flex justify-content-center">
    //        <img className="img-fluid" style={{ maxWidth: '600px' }} src={splashLogo} alt="Bytesphere"/>
    //      </div>
    //      <div className="col-md-6 side-text text-center text-md-start">
    //        <h1 className="text-title">A community of like-minded learners</h1>
    //        <p className="text-content">Bytesphere is an interactive platform for learning programming languages, offering real-time coding exercises and immediate feedback.</p>
    //      </div>
    //    </div>
    //  </div>
    //  <Footer />
    //</div>
    <Courses />
  );
}

export default App;
