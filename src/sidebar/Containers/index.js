import React, { Component } from 'react';
import './Containers.css';
import Identity from '../Identity';
import LoadingIndicator from '../../LoadingIndicator';

class Containers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    browser.storage.sync.get().then((data) => {
      this.setState(data)
    });
  }

  render(){
    if(this.state.identities == undefined){
      return(
        <LoadingIndicator/>
      )
    }
    else{
      return(this.renderList())
    }
  }

  renderList(){
    console.log(this.state.identities);
    var items = this.state.identities.map((identity) => {
        return (<Identity key={identity.name} name={identity.name} icon={identity.icon} color={identity.colorCode} />)
      });
    return(
      <table>
        <tbody>
          {items}
        </tbody>
      </table>);
  }
}

export default Containers;