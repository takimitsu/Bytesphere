import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython } from '@fortawesome/free-brands-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

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
        <Navbar userData={userData}/>
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
      <Footer userData={userData}/>
    </div>
  );
}

export default App;
