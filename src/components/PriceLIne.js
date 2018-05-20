import React from 'react';

import '../style/priceLine.css';

export const PriceLine = (props) => {
    let name = "";
    switch(props.id) {
        case 1: name = <p className="pickUp" onClick={props.handlePick}>{props.data.name}</p>
        break;
        case 2: name = <div><p>{props.data.name}</p> <p>{props.data.subname}</p></div>
        break;
        default: name = <p>{props.data.name}</p>;
    }
    return (
        <div id={props.id} className="row no-gutters line">
            <div className="col col-sm-8 desc">
                {name}
            </div>
            <div className="col col-sm-4 money">
                <p style={{fontWeight: "900"}}>${props.data.value}</p>
            </div>
        </div>
    )
};