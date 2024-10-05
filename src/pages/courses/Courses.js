import './Courses.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import basicsImage from '../../assets/basics.png';
import pythonImage from '../../assets/python.jpg';
import javascriptImage from '../../assets/javascript.jpeg';
import reactImage from '../../assets/react.jpeg';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const fetchCourseTitles = async (courseName) => {
    try {
      const courseCollection = collection(db, courseName);
      const courseSnapshot = await getDocs(courseCollection);

      const courseStatsDoc = doc(db, courseName, 'courseStats');
      const courseStatsSnapshot = await getDoc(courseStatsDoc);
        
      const titles = [];
      courseSnapshot.forEach(doc => {
        const lessonData = doc.data();
        titles.push(lessonData.subTitle);
      });

      const mainTitle = courseStatsSnapshot.exists() ? courseStatsSnapshot.data().mainTitle : 'Untitled Course';

      return { titles, mainTitle };
    } catch (error) {
      console.error(`Error fetching ${courseName} lessons: `, error);
      return { titles: [], mainTitle: '' };
    }
};

function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [titles, setTitles] = useState([]);
    const [mainTitle, setMainTitle] = useState('');
    const [lessonData, setLessonData] = useState('');

  useEffect(() => {
    document.title = 'Bytesphere';
  }, []);


 const openModal = async (courseName) => {
    const { titles, mainTitle } = await fetchCourseTitles(courseName);
    setTitles(titles);
    setMainTitle(mainTitle);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setLessonData('');
    setTitles([]);
    setMainTitle('');
  };

  return (
    <div className="Courses">
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
                                <a className="btn btn-primary" onClick={() => openModal('basicsCourse')}>Open Course</a>
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
                                <a className="btn btn-primary mt-auto" onClick={() => openModal('pythonCourse')}>Open Course</a>
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
                                <a className="btn btn-primary mt-auto" onClick={() => openModal('javaScriptCourse')}>Open Course</a>
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
                                <a className="btn btn-primary mt-auto" onClick={() => openModal('reactCourse')}>Open Course</a>
                            </div>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className={`modal fade ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{mainTitle}</h5>
            </div>
            <div className="modal-body">
                <ul>
                    {titles.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
