import React from 'react';

import '../style/discountForm.css';

export const DiscountForm = (props) => {
    return (
        <div className={props.class}>
            {props.children}
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Apply promo code" 
                    aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" 
                    value={props.value}
                    onChange={props.handleInput} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={props.handleSubmit}>Button</button>
                </div>
            </div>
        </div>
    )
};