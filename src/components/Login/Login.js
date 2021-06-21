import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [userData, setUserData] = useState({})

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                handleResponse(res, res.success);
                const newUser = {
                    ...data,
                    role: 'Job Seeker'
                }
                setUserData(newUser);
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
            <h3 className="text-center">Log In</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" {...register("password", { required: true })} />
                </div>
                <input type="submit" className="btn btn-success" value="Sign In" />
            </form>
            <Link to='/signup' className="mt-3" >Create New Account</Link>
        </div>
    );
};

export default Login;