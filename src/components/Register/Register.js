import React, { useState } from 'react';
import '../../components/Sign&Reg.css'

const Register = (props) => {
    const { onRouteChange, loadUser } = props;
    const [signInEmail, setSignInEamil] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [signInName, setSignInName] = useState('');

    const onNameChange = (event) => {
        setSignInName(event.target.value);
    }
    const onEmailChange = (event) => {
        setSignInEamil(event.target.value);
    }
    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitRegister = () => {
        fetch('https://fast-tor-15674.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: signInName,
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange('home');
                }
            })
    }
    return (
        <div className="center-div"> 
            <div className="inner-div">
                <input onChange={onNameChange} className="cred-input" type="text" name="name" id="name" placeholder="USERNAME"/>
            
                <input onChange={onEmailChange} className="cred-input" type="email" name="email-address" id="email-address" placeholder="EMAIL" />
            
                <input onChange={onPasswordChange} className="cred-input" type="password" name="password" id="password" placeholder="PASSWORD" />
                    
                <input onClick={onSubmitRegister} className="log-btn" type="submit" value="Register" />
            
                <p onClick={() => onRouteChange('signin')} className="nav-p">I alredy have an account</p>
            </div>
        </div>
          
    )
}

export default Register;