import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import Payment from './../Payment/Payment';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, createUserWithEmailAndPassword } from '../Login/LoginManager';

const EmployerSignUp = ({ setEmployer }) => {
    const [paymentId, setPaymentId] = useState('')
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [userData, setUserData] = useState({})

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    const onSubmit = data => {
        if (paymentId) {
            createUserWithEmailAndPassword(data.name, data.email, data.password)
                .then(res => {
                    handleResponse(res, res.success);
                    const newUser = {
                        ...data,
                        role: 'Employer',
                        paymentId: paymentId
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
    }

    const handlePaymentSuccess = id => {
        setPaymentId(id)
        console.log(paymentId)
    }

    const handleResponse = (res, redirect) => {
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    return (
        <div className="container">
            <h3 className="text-center">Create Employer Account</h3>
            <button onClick={() => setEmployer(false)} className="btn btn-primary mt-3">Create Job Seeker Account</button>
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
                    <label className="form-label">Account Type</label>
                    <select className="form-select" defaultValue="Basic" {...register("accountType")}>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" {...register("password", { required: true })} />
                </div>
                <div className="mt-3">
                    <Payment handlePayment={handlePaymentSuccess}></Payment>
                </div>
                <input type="submit" className="btn btn-success" value="Create Account" />
            </form>
        </div>
    );
};

export default EmployerSignUp;