import React from 'react';

const Rank = (props) => {
    const { userName, userEntries } = props;
    return (
        <div>
            <div className="white f3">
                {`${userName}, your currant rank is...`}
            </div>
            <div className="white f1">
                {`#${userEntries}`}
            </div>
        </div>
    )
}

export default Rank;