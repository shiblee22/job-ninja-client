import React, { useState } from 'react';
import Navbar from './../Navbar/Navbar';
import EmployerSignUp from './../EmployerSignUp/EmployerSignUp';
import JobSeekerSignUp from './../JobSeekerSignUp/JobSeekerSignUp';

const SignUp = () => {
    const [employer, setEmployer] = useState(true);
    return (
        <div>
            <Navbar />
            {employer ? <EmployerSignUp setEmployer={setEmployer} /> : <JobSeekerSignUp setEmployer={setEmployer} />}
        </div>
    );
};

export default SignUp;