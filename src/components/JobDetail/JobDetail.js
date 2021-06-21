import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import { UserContext } from './../../App';

const JobDetail = () => {

    const history = useHistory();
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [userData, setUserData] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3001/users/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setUserData(data[0]))
    }, [loggedInUser])

    useEffect(() => {
        fetch(`http://localhost:3001/jobsdetail/${id}`)
            .then(res => res.json())
            .then(data => setJob(data[0]))
    }, [id])
    const handleApprove = () => {
        fetch(`http://localhost:3001/updateStatus/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => history.push('/'))
    }

    const handleApply = () => {
        alert('Your application is submitted successfully');
    }

    return (
        <div>
            <Navbar />
            {
                job && <div className="container mt-3">
                    <h3>{job.jobTitle}</h3>
                    <h5>Company Name : {job.companyName}</h5>
                    <p>Posted by: {job.name}</p>
                    <p>Work Hour Per Month: {job.workHour}</p>
                    <p>Description:</p>
                    <p>{job.description}</p>
                    {userData.role === 'Job Seeker' && <button className="btn btn-success" onClick={handleApply}>Apply Now</button>}
                    {(userData.role === 'Admin' && job.status === 'Pending') && <button onClick={handleApprove} className="btn btn-success">Approve</button>}
                </div>
            }
        </div>
    );
};

export default JobDetail;