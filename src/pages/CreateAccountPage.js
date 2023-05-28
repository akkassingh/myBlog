import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const CreateAccountPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');
    const [ error, setError ] = useState('');

    const navigate = useNavigate();

    const creteAccount = async () => {
        try {
            if(password !== confirmPassword){
                setError('Password do not match.');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        }catch (e){
            setError(e.message);
        }
    }

    return (
        <>
        {error && <p className='error'>{error}</p>}
            <h1>Create Account</h1>
            <input placeholder='Your email address' value={email} onChange={e=> setEmail(e.target.value)}></input>
            <input placeholder = 'password' type='password' value={password} onChange={e=> setPassword(e.target.value)}></input>
            <input placeholder = 're-enter your password' type='password' value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}></input>
            <button onClick={creteAccount}>Create Account</button>
            <Link to="/login">Alerady have an Account? Login in here.</Link>
        </>
    )
}

export default CreateAccountPage;