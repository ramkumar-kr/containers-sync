import React, { Component } from 'react';
import './Actions.css';
import LoadingIndicator from '../../LoadingIndicator';
import LoadComplete from '../../LoadComplete';
import Button from '../../Button';

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, justLoaded: false };
    this.backup = this.backup.bind(this);
    this.restore = this.restore.bind(this);
  }
  

  backup() {
    this.setState({ loading: true }, () => {
      browser.runtime.sendMessage({ type: "backup" })
        .then(() => { this.setState({ loading: false, justLoaded: true }, () => {
          setTimeout(() => {
            this.setState({loading: false, justLoaded: false})
          }, 2000);
        })
      })
    })
  }

  restore(){
    this.setState({ loading: true }, () => {
      browser.runtime.sendMessage({ type: "restore" })
        .then(() => {
          this.setState({ loading: false, justLoaded: true }, () => {
            setTimeout(() => {
              this.setState({ loading: false, justLoaded: false })
            }, 2000);
          })
        })
    })
  }

  openSidebar(){
    browser.sidebarAction.open();
  }

  renderButtons(){
    return (<div className="ActionItem">
      <Button className="BackupBtn" onClick={this.backup}>Backup</Button>
      <Button className="RestoreBtn" onClick={this.restore}>Restore</Button>
      <Button className="SidebarBtn" onClick={this.openSidebar}>View Synced Containers</Button>
    </div>)
  }

  render() {
    var loading = this.state.loading;
    var justLoaded = this.state.justLoaded;
    return (
      <div className="Body">
        { loading && <LoadingIndicator /> }
        { justLoaded && <LoadComplete /> }
        {this.renderButtons()}
      </div>
    );
  }
}

export default Actions;