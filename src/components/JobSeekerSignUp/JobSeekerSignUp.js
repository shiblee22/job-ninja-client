import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, createUserWithEmailAndPassword } from '../Login/LoginManager';

const JobSeekerSignUp = ({ setEmployer }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [userData, setUserData] = useState({})

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    const onSubmit = data => {
        createUserWithEmailAndPassword(data.name, data.email, data.password)
            .then(res => {
                handleResponse(res, res.success);
                const newUser = {
                    ...data,
                    role: 'Job Seeker'
                }
                setUserData(newUser);
                fetch(`https://morning-everglades-27470.herokuapp.com/addUser`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => { })
            })
    }

    const handleResponse = (res, redirect) => {
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    return (
        <div className="container">
            <h3 className="text-center">Create Job Seeker Account</h3>
            <button onClick={() => setEmployer(true)} className="btn btn-primary mt-3">Create Employer Account</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" {...register("name", { required: true })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" {...register("password", { required: true })} />
                </div>
                <input type="submit" className="btn btn-success" value="Create Account" />
            </form>
        </div>
    );
};

export default JobSeekerSignUp;