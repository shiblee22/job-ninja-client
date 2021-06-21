import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const PostJob = ({ userData }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const { name, email, role, accountType } = userData;
        let workHour = '';
        if (userData.accountType === 'Basic') {
            workHour = 10
        } else if (userData.accountType === 'Standard') {
            workHour = 20
        } else {
            workHour = 30
        }

        const newJob = {
            ...data,
            workHour,
            name,
            email,
            role,
            accountType,
            status: 'Pending'

        }
        fetch(`https://morning-everglades-27470.herokuapp.com/addJob`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => { alert('Job Posted Sucessfully for Review.') })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input type="text" className="form-control" {...register("jobTitle", { required: true })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-control" {...register("companyName", { required: true})} />
            </div>
            <div className="mb-3">
                {userData.accountType === 'Basic' && <h5>Work Hours Per Month : 10 hours</h5>}
                {userData.accountType === 'Standard' && <h5>Work Hours Per Month : 20 hours</h5>}
                {userData.accountType === 'Premium' && <h5>Work Hours Per Month : 30 hours</h5>}
            </div>
            <div className="mb-3">
                <label className="form-label">Tags</label>
                <input type="text" className="form-control" {...register("tags", { required: true })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Job Description</label>
                <input type="text" className="form-control" {...register("description", { required: true })} />
            </div>
            <input type="submit" className="btn btn-success" value="Post Job" />
        </form>
    );
};

export default PostJob;