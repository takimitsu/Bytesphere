import './Courses.css';
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import logo from './assets/bytesphere_logo.png';
import splashLogo from './assets/splashlogo.png';
import basicsImage from './assets/basics.png';
import pythonImage from './assets/python.jpg';
import javascriptImage from './assets/javascript.jpeg';
import reactImage from './assets/react.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg py-3 px-5">
      <a className="navbar-brand" href="#">
        <img src={logo} style={{ height: '50px' }} alt="Bytesphere"/>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Courses
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Basics</a>
              <a className="dropdown-item" href="#">Python</a>
              <a className="dropdown-item" href="#">JavaScript</a>
              <a className="dropdown-item" href="#">ReactJS</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Statistics</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">My Account</a>
          </li>
        </ul>
        <div className="text-center">
          <button className="login btn btn-primary" type="button" onClick={ toLogin }>Log In</button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <div className="footer mt-5 px-5 pt-4">
      <a className="brand" href="#">
        <img src={logo} style={{ height: '40px' }} alt="Bytesphere"/>
      </a>
      <div className="container widgets mt-3">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-3 widget-section d-flex justify-content-center">
            <ul>
              <li className="category mb-1">HOME</li>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="col-md-3 widget-section d-flex justify-content-center">
            <ul>
              <li className="category mb-1">COURSES</li>
              <li><a href="#">Basics</a></li>
              <li><a href="#">Python</a></li>
              <li><a href="#">JavaScript</a></li>
              <li><a href="#">ReactJS</a></li>
            </ul>
          </div>
          <div className="col-md-3 widget-section d-flex justify-content-center">
            <ul>
              <li className="category mb-1">STATISTICS</li>
              <li><a href="#">Progress</a></li>
              <li><a href="#">Total Score</a></li>
              <li><a href="#">Certificates</a></li>
            </ul>
          </div>
          <div className="col-md-3 widget-section d-flex justify-content-center">
            <ul>
              <li className="category mb-1">MY ACCOUNT</li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Log Out</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="terms-panel d-flex justify-content-between mt-3">
        <div className="terms">
          <span><a href="#">Privacy</a>&emsp;|&emsp;<a href="#">Terms</a>&emsp;|&emsp;<a href="#">Disclaimer</a>&emsp;|&emsp;<a href="#">Compliance</a></span>
        </div>
        <div className="social-media m-children">
          <a href="#"><FontAwesomeIcon icon={ faInstagram } size="xl"/></a>
          <a href="#"><FontAwesomeIcon icon={ faTwitterSquare } size="xl"/></a>
          <a href="#"><FontAwesomeIcon icon={ faFacebookSquare } size="xl"/></a>
          <a href="#"><FontAwesomeIcon icon={ faLinkedin } size="xl"/></a>
        </div>
      </div>
      <hr/>
      <div className="copyright-text pb-3 text-center">
        <span>&copy; Copyright 2024 Bytesphere. All rights reserved.</span>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.title = 'Bytesphere';
  }, []);

  return (
    <div className="App">
      <Header />
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
