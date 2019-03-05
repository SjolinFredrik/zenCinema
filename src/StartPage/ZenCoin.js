import React from 'react';
import {} from 'reactstrap';

export default class ZenCoin extends React.Component {
  render(){
    return(
      <div className="coin">
        <div className="coin__front" />
        <div className="coin__edge">
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
        </div>
        <div className="coin__back" />
        <div className="coin__shadow" />
      </div>
    )
  }
}
