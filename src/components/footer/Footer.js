import './Footer.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import logo from '../../assets/bytesphere_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';

const Footer = ({ userData }) => {
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
            { userData ? 
                <>
                    <div className="container widgets mt-3">
                        <div className="row d-flex justify-content-center text-center">
                        <div className="col-md-3 widget-section d-flex justify-content-center">
                            <ul>
                            <li className="category mb-1">Home</li>
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Support</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 widget-section d-flex justify-content-center">
                            <ul>
                            <li className="category mb-1">Courses</li>
                            <li><a href="#">Basics</a></li>
                            <li><a href="#">Python</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li><a href="#">ReactJS</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 widget-section d-flex justify-content-center">
                            <ul>
                            <li className="category mb-1">Statistics</li>
                            <li><a href="#">Progress</a></li>
                            <li><a href="#">Total Score</a></li>
                            <li><a href="#">Certificates</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 widget-section d-flex justify-content-center">
                            <ul>
                            <li className="category mb-1">My Account</li>
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
                </>
                :
                <p>Register for free. Start learning.</p>
            }
            <hr/>
            <div className="copyright-text pb-3 text-center">
                <span>&copy; Copyright 2024 Bytesphere. All rights reserved.</span>
            </div>
        </div>
    );
}
 
export default Footer;