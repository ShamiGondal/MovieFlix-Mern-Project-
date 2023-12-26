import React from 'react'
import { Link, useLocation, Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        console.log(location.pathname)
    }, [location]);
    const onSubmit=(e)=>{
        e.preventDefault()
    }
    const handleClick=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fs-3 fw-bold" to="/"><i class="fa-solid fa-i text-primary fs-2 fw-bolder"></i> MovieFlix</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname ==="/"? "active":""} fw-medium  `} aria-current="page" to="/">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname ==="About"? "active":""} fw-medium `} to="/About">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname ==="About"? "active":""} fw-medium  `} to="/Contact">Contact Us</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')? <form className="d-flex " onSubmit={onSubmit}>
                        <Link className="btn btn-primary rounded-5 px-4  mx-2" to="/login" >Login</Link>
                        <Link className="btn btn-primary rounded-5 px-4 " to="/signup">Signup</Link>
                    </form>: <button onClick={handleClick} className='btn btn-primary rounded-5 px-4'>Logout</button> }
                </div>
            </div>
        </nav>
        <Outlet/>
        </div>
    )
}

export default Navbar