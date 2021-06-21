import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../App';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { email, name } = loggedInUser;
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light rounded" style={{backgroundColor:"#dee2e6"}}>
            <div className="container">
                <Link to="/" className="navbar-brand h1">JOB NINJA</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item fs-5">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item fs-5">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item fs-5">
                            {email ? <p className="nav-link bg-danger rounded">{name}</p> : <Link to="/login" className="nav-link bg-danger rounded">Login</Link>}
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;