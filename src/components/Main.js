import React, { Component } from 'react';

import { PriceDesc } from './PriceDesc';
import ItemComp from './ItemComp';
import { Description } from './Description';
import { DiscountForm } from './DiscountForm';

import '../style/main.css';

class Main extends Component {
    state={
        uppderBoundRecept: [{
            value: this.props.value,
            name: "Subtotal"
        }, 
        {
            value: (this.props.value * 0.038 * (-1)).toFixed(2),
            name: "Picking saving"
        }, 
        {
            value: (this.props.value * 0.087).toFixed(2),
            name: "Est. taxes & fees",
            subname: "(Based on 94085)"
        }],
        total: {
            value: 0,
            name: "Est. total"
        },
        classes: [
            {
                "row no-gutters closedDesc": "row no-gutters openedDesc"
            },
            {
                "row no-gutters closedDiscount": "row no-gutters openedDiscount"
            }
        ],
        childrenProps: [
            {
                extend: false,
                class: "row no-gutters closedDesc",
                header: ["Hide item details –", "See item details +"]
            },
            {
                extend: false,
                class: "row no-gutters closedDiscount",
                header: ["Hide promo code –", "Apply promo code +"]
            }
        ],
        input: {
            value: "",
            attemp: 0,
            codeStatus: false,
            statusPress: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            let tempArr = [...prevState.uppderBoundRecept];
            tempArr[0].value = nextProps.value;
            tempArr[1].value = (nextProps.value * 0.038 * (-1)).toFixed(2);
            tempArr[2].value = (nextProps.value * 0.087).toFixed(2);
            let tempTotal = {...prevState.total}
            tempTotal.value = 0;
            tempArr.forEach(elem => tempTotal.value += parseFloat(elem.value));
            tempTotal.value = tempTotal.value.toFixed(2);
            return {
                uppderBoundRecept: tempArr,
                total: tempTotal
            };
        } else return null;
    };

    componentDidMount() {
        let value = 0;
        this.state.uppderBoundRecept.forEach(elem => value += parseFloat(elem.value));
        value = value.toFixed(2);
        this.setState({
            total: {...this.state.total, value}
        })
    };

    handleInput(event) {
        let newValue = {...this.state.input}
        newValue.value = event.target.value; 
        newValue.statusPress = false;
        this.setState({
            input: newValue
        })
    };

    handleSubmit(event) {
        if (this.state.input.value == this.props.promo && !this.state.input.codeStatus) {
            this.props.discountCharge();
            let updatedInput = this.state.input;
            updatedInput.value = "";
            updatedInput.codeStatus = true;
            updatedInput.statusPress = true;
            updatedInput.attemp += 1;
            this.setState({
                input: updatedInput
            })
        } else if (this.state.input.value == this.props.promo && this.state.input.codeStatus) {
            let updatedInput = this.state.input;
            updatedInput.value = "";
            updatedInput.attemp += 1;
            updatedInput.statusPress = true;
            this.setState({
                input: updatedInput
            })
        } else {
            let updatedInput = this.state.input;
            updatedInput.value = "";
            updatedInput.statusPress = true;
            this.setState({
                input: updatedInput
            })
        }
    };

    handleItem(event) {
        event.preventDefault();
        let index = event.target.id;
        if (event.target.id == 1 && this.state.childrenProps[1].extend) {
            let updatedInput = this.state.input;
            updatedInput.statusPress = false;
            this.setState({
                input: updatedInput
            })
        }
        if (!this.state.childrenProps[index].extend) {
            let tempChildren = {...this.state.childrenProps}
            tempChildren[index].extend = true;
            this.setState({
                childrenProps: tempChildren
            });
            setTimeout(() => {
                tempChildren[index].class = Object.values(this.state.classes[index])[0];
                this.setState({
                    childrenProps: tempChildren
                })
            }, 50)
        } else {
            let tempChildren = {...this.state.childrenProps}
            setTimeout(() => {
                tempChildren[index].extend = false;
                this.setState({
                    childrenProps: tempChildren
                })
            }, 1000)
            tempChildren[index].class = Object.keys(this.state.classes[index])[0];
            this.setState({
                childrenProps: tempChildren
            });
        }
    };

render() {
    let child2 = undefined;
    let discount = (parseFloat(this.state.uppderBoundRecept[0].value) + parseFloat(this.state.uppderBoundRecept[1].value)).toFixed(2);
    let child1 = <Description
                    class={this.state.childrenProps[0].class}
                    photo={this.props.photo}
                    desc={this.props.description}
                    oldTotal={this.state.uppderBoundRecept[0].value}
                    discount={discount}
                />
    if (!this.state.input.statusPress) {
                child2 = <DiscountForm
                    class={this.state.childrenProps[1].class}
                    handleInput={this.handleInput.bind(this)}
                    value={this.state.input.value}
                    handleSubmit={this.handleSubmit.bind(this)}
                >
                </DiscountForm>
    } else if (this.state.input.attemp == 1 && this.state.input.codeStatus) {
            child2 = <DiscountForm
                        class={this.state.childrenProps[1].class}
                        handleInput={this.handleInput.bind(this)}
                        value={this.state.input.value}
                        handleSubmit={this.handleSubmit.bind(this)}
                    >
                        <p style={{fontSize: "12px", margin: "0rem 1rem", fontWeight: "800", color: "green"}}>you get 10% discount</p>
                    </DiscountForm>        
    } else if (this.state.input.codeStatus && this.state.input.attemp > 1 || !this.state.input.codeStatus && this.state.input.statusPress) {
            child2 = <DiscountForm
                        class={this.state.childrenProps[1].class}
                        handleInput={this.handleInput.bind(this)}
                        value={this.state.input.value}
                        handleSubmit={this.handleSubmit.bind(this)}
                    >
                    <p style={{fontSize: "12px", margin: "0rem 1rem", fontWeight: "800", color: "red"}}>invalid promo code</p>
                </DiscountForm>
    }
    const compArr = [child1, child2];
    return (
        <div className="col col-sm-5 main" onClick={this.handlePopUpOff}>
            <PriceDesc 
                data={this.state.uppderBoundRecept}
                handlePick={this.props.handlePick}
                total={this.state.total}
            />
            {compArr.map((elem, i) => {
                return (
                    <ItemComp 
                        extend={this.state.childrenProps[i].extend}
                        header={this.state.childrenProps[i].header}
                        handleItem={this.handleItem.bind(this)}
                        id={i}
                        key={i}
                    > 
                    {elem}
                    </ItemComp>
                    )
                })
            }
        </div>
        )
    }
};

export default Main;
