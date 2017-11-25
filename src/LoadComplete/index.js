import React, { Component } from 'react';
import './loaded.css';
import image from './done.svg';


class LoadComplete extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="icon">
          <img width="100%" height="100%" src={image} />
        </div>
        Done
      </div>
    );
  }
}

export default LoadComplete;