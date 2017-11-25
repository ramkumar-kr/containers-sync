import React, { Component } from 'react';
import './loader.css';
import image from './loading.svg';


class LoadingIndicator extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="icon">
          <img width="100%" height="100%" src={image} />
        </div>
        Loading...
      </div>
    );
  }
}

export default LoadingIndicator;