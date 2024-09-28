import './Signup.css';
import logo from '../../../assets/bytesphere_logo.png';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();

        if (password == confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                console.log(userCredential);
                const userid = userCredential.user.uid;

                try {
                    await setDoc(doc(db, "users", userid), {
                        username: username,
                        level: 0,
                        finishedLessons: 0,
                        masteredCourses: 0,
                        achievements: 0,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                navigate('/login');
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log('Passwords do not match!');
        }
    };

    const navigate = useNavigate();

    const toHome = () => {
        navigate('/');
    };

    return (
        <div>
            <img className="m-5"src={logo} alt="Bytesphere" onClick={ toHome }/>
            <form onSubmit={signUp}>
                <div className="main-container d-flex justify-content-center">
                    <div className="login-container p-5">
                        <h3>Sign Up</h3>
                        <label for="username">Username</label><br/>
                        <input className="username-input w-100" name="username" placeholder="Enter 3 characters or more" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label className="mt-3" for="email">E-mail Address</label><br/>
                        <input className="email-input w-100" name="email" placeholder="you@example.com" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                        <label className="mt-3" for="password">Password</label>
                        <input className="password-input w-100" name="password" placeholder="Enter 6 characters or more" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                        <label className="mt-3" for="confirmPassword">Confirm Password</label>
                        <input className="confirm-password-input w-100" name="confirmPassword" placeholder="Confirm your password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/><br/>
                        <input className="remember-input m-1 my-3" type="checkbox" name="remember"/>
                        <label for="terms" style={{color: '#7c7c7c', fontSize:'0.9rem'}}>I accept the <a>Terms and Conditions</a></label><br/>
                        <button className="btn btn-primary w-100" type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Signup;