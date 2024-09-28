import './Courses.css';
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import basicsImage from '../../assets/basics.png';
import pythonImage from '../../assets/python.jpg';
import javascriptImage from '../../assets/javascript.jpeg';
import reactImage from '../../assets/react.jpeg';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function App() {
  useEffect(() => {
    document.title = 'Bytesphere';
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="main-container container mt-5">
        <p className="text-center mb-4">Choose a Course</p>
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                <div className="card">
                    <img src={basicsImage} className="card-img-top" alt="Basics"/>
                    <div className="card-body">
                        <h5>Programming Basics</h5>
                        <p>Starting out? Learn everything about the world of programming here. We all start somewhere!</p>
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                <p className="mb-0">5 Lessons</p>
                                <a className="btn btn-primary">Open Course</a>
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                <div className="card">
                    <img src={pythonImage} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5>Python</h5>
                        <p>A course masterfully crafted to teach you the basics of the most universal programming language, Python.</p>
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">5 Lessons</p>
                                <a className="btn btn-primary mt-auto">Open Course</a>
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                <div className="card">
                    <img src={javascriptImage} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5>JavaScript</h5>
                        <p>You can't go wrong with the most used programming language for web development!</p>
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">9 Lessons</p>
                                <a className="btn btn-primary mt-auto">Open Course</a>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                <div className="card">
                    <img src={reactImage} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5>React</h5>
                        <p>Want to create amazing websites that can be used commercially? This course is for you.</p>
                        <div className="mt-auto"> 
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 mt-auto">15 Lessons</p>
                                <a className="btn btn-primary mt-auto">Open Course</a>
                            </div>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
