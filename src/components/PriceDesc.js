import React from 'react';

import { PriceLine } from './PriceLIne';
import { Total } from './Total';

import '../style/priceDesc.css';

export const PriceDesc = (props) => {
    return (
        <div className="row no-gutters">
            <div className="col col-sm-12">
                {
                    props.data.map((elem, index) => {
                        return (
                            <PriceLine 
                                key={index}
                                id={index}
                                data={elem}
                                handlePick={props.handlePick}
                            />
                        )
                    })
                }
                <hr/>
                <Total 
                    total={props.total}
                />
            </div>
        </div>
    )
};

