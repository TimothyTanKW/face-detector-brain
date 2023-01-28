import React from 'react';
import './FaceDetection.css'

const FaceDetection = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className='f3 center'>
                {'Face Dectection Tech to Detect Faces in an Image!'}
            </p>
            <div className='center-flex'>
                <div className='pa4 br3 shadow-5 center-flex form bg-effect'>
                    <input type='text' className='f4 w-70 pa2' onChange={onInputChange}></input>
                    <button className='w-30 grow link ph3 f4 pv2 dib white bg-light-purple' onClick={onSubmit}>DETECT</button>
                </div>

            </div>
        </div>
    );
}

export default FaceDetection;