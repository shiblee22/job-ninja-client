import React, { useEffect, useState } from 'react';
import Navbar from './../Navbar/Navbar';
import JobsCard from './../JobsCard/JobsCard';
import Pagination from './../Pagination/Pagination';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const [jobPerPage, setJobPerPage] = useState(20);
    useEffect(() => {
        fetch(`http://localhost:3001/jobs/Approved`)
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])

    const indexOfLastJob = currentPage * jobPerPage;
    const indexOfFirstJob = indexOfLastJob - jobPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleFilterChange = e => {
        setFilter(e.target.value)
        if (e.target.value === 'all') {
            fetch(`http://localhost:3001/jobs/Approved`)
                .then(res => res.json())
                .then(data => setJobs(data))
        } else {
            fetch(`http://localhost:3001/jobs/Approved`)
                .then(res => res.json())
                .then(data => {
                    const filteredJobs = data.filter(item => item.tags.includes(e.target.value));
                    const notMatchedJobs = data.filter(item => !item.tags.includes(e.target.value))
                    const newJobs = [...filteredJobs, ...notMatchedJobs];
                    setJobs(newJobs)
                })
        }
    }
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
            <Navbar />
            <div className="container mt-3">
                <p>Filter : </p>
                <select value={filter} onChange={e => handleFilterChange(e)}>
                    <option value="all">All</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="angular">Angular</option>
                    <option value="vue">Vue</option>
                    <option value="node">Node</option>
                    <option value="laravel">Laravel</option>
                </select>
                <div className="row">
                    {currentJobs.map(item => <JobsCard key={item._id} job={item} />)}
                </div>
                <Pagination
                    jobPerPage={jobPerPage}
                    totalJob={jobs.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default Home;