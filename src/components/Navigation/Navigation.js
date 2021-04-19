import React from 'react';
import './Nav.css';

const Navigation = (props) => {
    const { onRouteChange, isSignedIn } = props;
    if (isSignedIn) {
        return (
            <div className="div-nav">
                <nav className="nav-bar">
                    <p onClick={() => onRouteChange('signout')} className='nav-btn'>Sign Out</p>
                </nav>
            </div>
        )
    } else {
        return null
    }
}

export default Navigation;