import React from 'react';


export default class Seat extends React.Component {

  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  handleMouseOver(e) {
    this.props.onHover(this.props.index); // seat index
  }

  handleMouseClick() {
    this.props.onClick(this.props.index); // seat index
  }

  render() {
    return(
      <div 
        onMouseOver={() => {this.handleMouseOver()}}
        onClick={this.handleMouseClick}
        className={"seat " + (this.props.taken ? 'taken' : '') + (this.props.chosen && !this.props.taken ? ' best chosen-seats' : '') + (this.props.highlighted ? ' highlight' : '')}
        id={this.props.name}>
        <div className="ghost-div"></div>
      </div>
    )
  }
}


// 