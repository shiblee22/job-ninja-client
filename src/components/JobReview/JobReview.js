import React, { useEffect, useState } from 'react';
import JobsCard from './../JobsCard/JobsCard';

const JobReview = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/jobs/Pending`)
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])
    return (
        <div>
            <h3 className="text-center mt-3">Review the Jobs</h3>
            <div className="row">
            {jobs.map(item => <JobsCard key={item._id} job= {item} />)}
            </div>
        </div>
    );
};

export default JobReview;