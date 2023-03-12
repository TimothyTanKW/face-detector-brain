import React from 'react';

const Rank = ({name , entries}) => {
    return (
        <div>
            <div className='center f3 white'>
                {`${name}, your face detection image entries is...`}

            </div>
            <div className='center f1 white'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;