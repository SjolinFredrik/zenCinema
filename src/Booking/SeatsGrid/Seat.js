import React from 'react';


export default class Seat extends React.Component {

  constructor(props) {
    super(props);
    // this.best = false;

    // this.hoverMe = this.hoverMe.bind(this);
    // this.unHoverMe = this.unHoverMe.bind(this);
    // this.clickMe = this.clickMe.bind(this);
  }

  hoverMe() {
    console.log(this);
    this.props.seatsGrid.hoverSeats(this, 2);
    console.log('hovered');
    return; //temp
  }

  unhoverMe() {
    // this.seatsGrid.unhoverSeats();
    return; //temp
  }

  clickMe() {
    // this.seatsGrid.chooseSeats();
    this.setState({
      chosen: true
    })
  }


  render() {
    return(
      <div onMouseOver={() => {this.hoverMe()}} onMouseLeave={this.unHoverMe} onClick={this.clickMe} className={"seat " + (this.props.taken ? 'taken ' : '') + (this.props.best ? 'best chosen-seats' : '')} id={this.props.name}>
        <div className="ghost-div"></div>
      </div>
    )
  }
}