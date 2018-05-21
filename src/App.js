import React, { Component } from 'react';
import './App.css';
import { data } from './data/items';
 
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        popUpClass: "closedPopUP",
        position: {
          width: window.innerWidth,
          height: window.innerHeight
        }
    }
    this.handlePick = this.handlePick.bind(this);
    this.discountCharge = this.discountCharge.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleOutSideClick=this.handleOutSideClick.bind(this);
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    return {
      items: data,
    }
  };

  discountCharge() {
    let newItem = [...this.state.items];
    newItem[0].value -= (newItem[0].value * 10 / 100).toFixed(2);
    this.setState({
      items: newItem
    })
  };

  handlePick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      popUpClass: "openedPopUp"
    })
  };

  handleOutSideClick(event) {
    this.setState({
      popUpClass: "closedPopUP"
    })
  };

  updateDimensions() {
    let newPistion = {width: window.innerWidth, height: window.innerHeight}
    this.setState({
      position: newPistion
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  };

render() {
  let style = {
      top: this.state.position.height / 5.5,
      left: this.state.position.width / 3
    };
    return (
      <div className="container">
        <div className={this.state.popUpClass} style={style}> 
          <p>Pick up your order in the store helps cuts costs, and we pass the savings on to you</p>
        </div>
        <div className="row no-gutters justify-content-center" onClick={this.handleOutSideClick}>      
          <Main 
            value={this.state.items[0].value}
            photo={this.state.items[0].photo}
            description={this.state.items[0].description}
            promo={this.state.items[0].promoCode}
            discountCharge={this.discountCharge.bind(this)}
            handlePick={this.handlePick}
          />
        </div>
      </div>
    );
  }
}

export default App;
