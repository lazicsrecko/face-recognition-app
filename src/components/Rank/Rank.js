import React from 'react';
import './Rank.css';

const Rank = (props) => {
    const { userName, userEntries } = props;
    return (
        <div className="div-rank">
            <div>
                {`${userName}, your currant rank is...`}
            </div>
            <div>
                {`#${userEntries}`}
            </div>
        </div>
    )
}

export default Rank;