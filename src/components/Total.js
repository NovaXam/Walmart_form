import React from 'react';

import '../style/total.css';

export const Total = (props) => {
    return (
        <div className="row no-gutters total">
            <div className="col col-sm-7 desc">
                {props.total.name}
            </div>
            <div className="col col-sm-5 money">
                <p>${props.total.value}</p>
            </div>
        </div>
    )
};