import React, { useState } from 'react';
import './Signin.css';

const Signin = (props) => {
    const { onRouteChange, loadUser } = props;
    const [signInEmail, setSignInEamil] = useState('');
    const [signInPassword, setSignInPassword] = useState('')

    const onEmailChange = (event) => {
        setSignInEamil(event.target.value);
    }
    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('https://fast-tor-15674.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    loadUser(data);
                    onRouteChange('home');
                }
            })
    }

    return (
        <div className="center-div"> 
            <input onChange={onEmailChange} className="cred-input" type="email" name="email-address" id="email-address" placeholder="EMAIL" />
        
            <input onChange={onPasswordChange} className="cred-input" type="password" name="password" id="password" placeholder="PASSWORD" />
        
            <input onClick={onSubmitSignIn} className="log-btn" type="submit" value="Sign In" />
        
            <p onClick={() => onRouteChange('register')} className="nav-p">Register</p>
        </div>
    )
}

export default Signin;