import React from 'react';

const Navigation = (props) => {
    const { onRouteChange, isSignedIn } = props;
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className='p3 link dim underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return null
    }
}

export default Navigation;