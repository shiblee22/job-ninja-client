import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../App';
import Navbar from './../Navbar/Navbar';
import PostJob from './../PostJob/PostJob';
import JobReview from './../JobReview/JobReview';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [userData, setUserData] = useState({})
    useEffect(() => {
        fetch(`https://morning-everglades-27470.herokuapp.com/users/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setUserData(data[0]))
    }, [loggedInUser])
    return (
        <div>
            <Navbar />
            <div className="container mt-3">
            <h5 className="text-center">Name : {userData.name}</h5>
            <h5 className="text-center">Email: {userData.email}</h5>
            <h5 className="text-center">Role : {userData.role}</h5>
            {userData.accountType && <h5 className="text-center">Account Type : {userData.accountType}</h5>}
            {userData.role === 'Employer' && <PostJob userData={userData} />}
            {userData.role === 'Admin' && <JobReview />}
            {userData.role === 'Job Seeker' && <Link to='/' className="btn btn-primary" >Apply To Jobs</Link>}
        </div>
        </div>
    );
};

export default Dashboard;