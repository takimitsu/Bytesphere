import './Dashboard.css';
import logo from './assets/bytesphere_logo.png';
import splashLogo from './assets/splashlogo.png';
import avatar from './assets/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPython } from '@fortawesome/free-brands-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';

import Login from './Login.js';
import Signup from './Signup.js';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function Header({ userData }) {
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
        <div className="text-center d-flex">
            <div className="byte-info d-flex justify-content-center align-items-center me-5"> 
                <img src={splashLogo} style={{ maxHeight: '30px' }} alt="Currency" className="me-2"/>
                <p className="mb-0">{userData ? userData.level : 0}</p>
            </div>
            <img src={avatar} style={{ maxHeight: '50px' }} alt="Profile"/>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('Sign out was successful.')
      navigate('/');
    }).catch((error) => {
      console.log(error)
    });
  } 

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
              <li><a href="#" onClick={userSignOut}>Log Out</a></li>
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
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        setAuthUser(null);
        setUserData(null);
        navigate('/login');
      }
    });

    return () => {
      listen();
    }
  }, []);

  useEffect(() => {
    document.title = 'Bytesphere';
  }, []);

  return (
    <div className="App">
        <Header userData={userData}/>
        <div className="main-container container">
            <h1 className="mt-5">{userData ? `Welcome, ${userData.username}!` : 'N/A'}</h1>
            <div className="row mt-3">
                <div className="left-section col-12 col-lg-6 mb-5">
                    <div className="progress-section mb-3">
                        <p className="section-title mb-1">Your Progress</p>
                        <div className="progress-content p-4">
                            <div className="row text-center">
                              <div className="col-12 col-md-4 progress-item">
                                  <p>Finished Lessons</p>
                                  <h3>{userData ? `${userData.finishedLessons} / 64` : 0}</h3>
                              </div>
                              <div className="col-12 col-md-4 progress-item">
                                  <p>Mastered Courses</p>
                                  <h3>{userData ? `${userData.masteredCourses} / 4` : 0}</h3>
                              </div>
                              <div className="col-12 col-md-4 progress-item">
                                  <p>Achievements</p>
                                  <h3>{userData ? `${userData.achievements} / 178` : 0}</h3>
                              </div>
                            </div> 
                            <div className="progress-bar-container mt-3">
                                <progress value={userData ? ((userData.finishedLessons + userData.masteredCourses + userData.achievements) / 246) * 100 : 0} max="100"></progress>
                                <span className="progress-percentage">{userData ? `${(((userData.finishedLessons + userData.masteredCourses + userData.achievements) / 246) * 100).toFixed(2)}%` : '0%'}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div className="recent-lessons-section">
                        <p className="section-title mb-1">Recent Lessons</p>
                        <div className="recent-lessons-content d-flex justify-content-between align-items-center p-4">
                            <div className="lesson-info-section d-flex align-items-center">
                                <FontAwesomeIcon className="me-3" icon={ faPython } size="4x"/>
                                <div className="d-flex flex-column justify-content-center">
                                    <h4>Python</h4>
                                    <p>Lesson 10 - Modules</p>
                                </div>
                            </div>
                            <button className="btn btn-primary">Continue</button>
                        </div>
                    </div>
                </div>
                <div className="right-section col-12 col-lg-6 mb-5">
                    <div className="popular-lessons-section">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="section-title mb-1">Popular Lessons</p>
                            <a className="sub-title mb-1">All lessons</a>
                        </div>
                        <div className="recent-lessons-content d-flex justify-content-between align-items-center p-4 mb-2">
                            <div className="lesson-info-section d-flex align-items-center">
                                <FontAwesomeIcon className="me-3" icon={ faPython } size="4x"/>
                                <div className="d-flex flex-column justify-content-center">
                                    <h4>Python</h4>
                                    <p>Lesson 10 - Modules</p>
                                </div>
                            </div>
                            <button className="btn btn-primary">View Lessons</button>
                        </div>
                        <div className="recent-lessons-content d-flex justify-content-between align-items-center p-4 mb-2">
                            <div className="lesson-info-section d-flex align-items-center">
                                <FontAwesomeIcon className="me-3" icon={ faReact } size="4x"/>
                                <div className="d-flex flex-column justify-content-center">
                                    <h4>React</h4>
                                    <p>Lesson 11 - Routing</p>
                                </div>
                            </div>
                            <button className="btn btn-primary">View Lessons</button>
                        </div>
                        <div className="recent-lessons-content d-flex justify-content-between align-items-center p-4 mt-2">
                            <div className="lesson-info-section d-flex align-items-center">
                                <FontAwesomeIcon className="me-3" icon={ faCodepen } size="4x"/>
                                <div className="d-flex flex-column justify-content-center">
                                    <h4>Basics</h4>
                                    <p>Lesson 1 - Binary</p>
                                </div>
                            </div>
                            <button className="btn btn-primary">View Lessons</button>
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
