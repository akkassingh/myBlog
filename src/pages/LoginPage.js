import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        }catch (e){
            setError(e.message);
        }
    }
    return (
        <>
        {error && <p className='error'>{error}</p>}
            <h1>Login In</h1>
            <input placeholder='Your email address' value={email} onChange={e=> setEmail(e.target.value)}></input>
            <input placeholder = 'password' type='password' value={password} onChange={e=> setPassword(e.target.value)}></input>
            <button onClick={logIn}>Log In</button>
            <Link to="/create-account">Don't have an account? Create here.</Link>
        </>
    )
}

export default LoginPage;