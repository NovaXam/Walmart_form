import React from 'react';

import '../style/description.css';

export const Description = (props) => {
    return (
        <div className={props.class}>
            <div className="co col-sm-5">
                <img src={props.photo} alt="chair"/>
            </div>
            <div className="co col-sm-7">
                <div className="row no-gutters align-items-center rightBlock">
                    <p>{props.desc}</p>
                    <h6 className="col col-sm-6" style={{fontWeight: "800"}}>
                        ${props.discount}
                    </h6>
                    <h6 className="col col-sm-6" style={{textAlign: "right", fontSize: "13px"}}>
                        Qty: 1
                    </h6>
                </div>
                <div className="row no-gutters justify-content-center rightBlock">
                    <h6 className="col col-sm-12 initVal" style={{textAlign: "left", color: "grey", fontWeight: "500"}}>
                        ${props.oldTotal}
                    </h6>
                </div>
            </div>

        </div>
    )
};