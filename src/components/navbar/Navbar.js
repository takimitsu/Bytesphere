import './Navbar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import logo from '../../assets/bytesphere_logo.png';
import splashLogo from '../../assets/splashlogo.png';
import avatar from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ userData }) => {
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
                    { userData ?
                    <>
                        <div className="byte-info d-flex justify-content-center align-items-center me-5">
                            <img src={splashLogo} alt="Currency" style={{ maxHeight: '30px' }} className="me-2"/>
                            <p className="mb-0">{userData ? userData.level : 0}</p>
                        </div>
                        <img src={avatar} style={{ maxHeight: '50px' }} alt="Profile"/>
                    </>
                    : 
                    <button className="login btn btn-primary" type="button" onClick={ toLogin }>Log In</button>
                    }                    
                </div>
            </div>
        </nav>
    );
}

//<div className="byte-info d-flex justify-content-center align-items-center me-5"> 
//    <img src={splashLogo} style={{ maxHeight: '30px' }} alt="Currency" className="me-2"/>
//    <p className="mb-0">{userData ? userData.level : 0}</p>
//</div>

//<div className="text-center">
//      <button className="login btn btn-primary" type="button" onClick={ toLogin }>Log In</button>
//</div>
 
export default Navbar;