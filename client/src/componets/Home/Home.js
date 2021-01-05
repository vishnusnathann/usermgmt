import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

    return (
        <div className="home">
        <Link to="/adduser">
            <span className="action-button">Add user</span>
        </Link>
        <Link to="/listuser">
            <span className="action-button">List user</span>
        </Link>
    </div>
    )
}

export default Home
