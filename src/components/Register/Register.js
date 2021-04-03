import React, { useState } from 'react';

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
        <article className="br3  ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <article className="pa4 black-80">
                <div>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Register</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                            <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="mt3">
                        <input onClick={onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Register" />
                    </div>
                </div>
            </article>
        </article>
    )
}

export default Register;