import React from 'react';
import Tilt from 'react-parallax-tilt';
import facerecognition from './face-recognition.png';
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='tilt-box br3 shadow-2 pa3' style={{ height: '160px', backgroundColor: 'white', width: '160px' }}>
                <div className='tilt-img center'>
                    <img alt='face-recognition-logo' src={facerecognition} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;