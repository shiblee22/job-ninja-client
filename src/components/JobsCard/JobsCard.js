import React from 'react';
import { Link } from 'react-router-dom';

const JobsCard = ({job}) => {
    const{jobTitle, companyName, workHour, _id} = job;
    return (
        <div className="col-12 col-md-6 col-lg-3">
            <div className="card p-3 mt-3">
                <h5>{jobTitle}</h5>
                <p>Company Name: {companyName}</p>
                <p>Work Per Month: {workHour} hours</p>
                <Link to={`/jobdetail/${_id}`}>See Details</Link> 
            </div>
        </div>
    );
};

export default JobsCard;