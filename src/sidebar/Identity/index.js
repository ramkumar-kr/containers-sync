import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Identity.css';

class Identity extends Component {

  render() {
    var icon = `resource://usercontext-content/${this.props.icon}.svg`;
    return (
      <tr className="row" key={this.props.name}>
        <td className="logo" style={{ backgroundColor: this.props.color, mask: `url(${icon})  no-repeat center`  }}>
        </td>
        <td className="title">{this.props.name}</td>
      </tr>
    );
  }
}

Identity.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Identity;