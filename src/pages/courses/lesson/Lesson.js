import './Lesson.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';

const Lesson = () => {
    const { courseName, lessonId } = useParams();
    const [lessonContent, setLessonContent] = useState('');

    useEffect(() => {
        const fetchLessonContent = async () => {
          try {
            const lessonDoc = doc(db, courseName, lessonId);
            const lessonSnapshot = await getDoc(lessonDoc);
    
            if (lessonSnapshot.exists()) {
              setLessonContent(lessonSnapshot.data().text);
            } else {
              console.error('No such document!');
            }
          } catch (error) {
            console.error('Error fetching lesson content: ', error);
          }
        };
    
        fetchLessonContent();
    }, [courseName, lessonId]);

    return (
      <div className="lessons">
        <Navbar />
        <div className="lesson-content col-md-5 mx-auto p-5 mt-5" dangerouslySetInnerHTML={{ __html: lessonContent}}></div>
        <Footer />
      </div>
    );
}
 
export default Lesson;