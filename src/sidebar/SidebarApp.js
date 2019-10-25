import React, { Component } from 'react';
import Containers from './Containers';
import Button from '../Button';

class SidebarApp extends Component {
  refreshWindow(){
    window.location.reload();
  }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Containers />

        <Button style={{width: "90%", marginTop: "10px" }} onClick={this.refreshWindow}>Refresh</Button>
      </div>
    );
  }
}

export default SidebarApp;