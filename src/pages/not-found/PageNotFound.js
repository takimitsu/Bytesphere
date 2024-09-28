import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate('/');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="notfound-text text-center">
                <h1>:'(</h1>
                <h2>Sorry, this page does not exist.</h2>
                <p>Please return to the <a onClick={ toHome }>home page</a>.</p>
            </div>  
        </div>
    );
}
 
export default PageNotFound;