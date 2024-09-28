import './Login.css';
import logo from '../../../assets/bytesphere_logo.png';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const logIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential);
            setErrorMessage('');
            navigate('/dashboard');
        }).catch((error) => {
            setErrorMessage('Incorrect e-mail or password!');
            console.log(error);
        });
    };

    const toSignup = () => {
        navigate('/signup');
    };

    const toHome = () => {
        navigate('/');
    };

    return (
        <div>
            <img className="m-5" src={logo} alt="Bytesphere" onClick={ toHome }/>
            <form onSubmit={logIn}>
                <div className="main-container d-flex justify-content-center">
                    <div className="login-container p-5">
                        <h3>Login</h3>
                        <p>Don't have an account yet? <a onClick={ toSignup }>Sign Up</a></p>
                        <label for="email">E-mail Address</label><br/>
                        <input className="email-input w-100" name="email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <div className="d-flex mt-3">
                            <label for="password">Password</label>
                            <a className="forgot-password-anchor ms-auto" href="#">Forgot Password?</a>
                        </div>
                        <input className="password-input w-100" name="password" placeholder="Enter 6 characters or more" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                        <input className="remember-input m-1 my-3" type="checkbox" name="remember"/>
                        <label for="remember" style={{color: '#7c7c7c', fontSize:'0.9rem'}}>Remember Me</label><br/>
                        {errorMessage ? <p style={{color: '#b13f41'}}>{errorMessage}</p> : ''}
                        <button className="btn btn-primary w-100" type="submit">Log In</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Login;