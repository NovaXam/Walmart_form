import React from 'react';

import '../style/itemComp.css';

const ItemComp = (props) => {
    return props.extend
    ?
        <div className="row no-gutters item">
            <div className="col col-sm-12 block">
                <p id={props.id} className="title" onClick={props.handleItem}>{props.header[0]}</p>
                {props.children}
            </div>
        </div>
    : 
        <div className="row no-gutters item">
            <div className="col col-sm-12 block">
                <p id={props.id} className="title" onClick={props.handleItem}>{props.header[1]}</p>
            </div>
        </div>
};

export default ItemComp;
