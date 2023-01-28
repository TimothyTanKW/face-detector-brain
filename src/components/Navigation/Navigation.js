import React from 'react';

const Navigation = ({ onRouteChange, signedIn }) => {


    if (signedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim white underline pa3' onClick={() => onRouteChange('signin')}>
                    Sign Out
                </p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim white underline pa3' onClick={() => onRouteChange('register')}>
                    Register
                </p>
                <p className='f3 link dim white underline pa3' onClick={() => onRouteChange('signin')}>
                    Sign Out
                </p>
            </nav>
        )
    }
}

export default Navigation;