import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faSearch, faPaw, faCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, faPlus, faSearch, faPaw, faCircle, faGlobeAmericas);
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Main from '../components/main';
import Login from '../components/userLogin/Login.jsx';
import Friends from '../components/friends';
import Chat from '../components/chat/Chat.jsx'; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      hasSession: false
    };
    this.setAuth = this.setAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.getSessionId();
  }

  getSessionId() {
    axios
      .get('/userSession')
      .then(response => {
        if (response.data.id) {
          this.setState({
            id: response.data.id,
            hasSession: true
          });
        } else {
          this.setState({
            hasSession: true
          });
        }
      })
      .catch(err => {
        console.log('Error getting session id', err);
      });
  }

  logout() {
    axios.get('/logout')
      .catch(err => {
        console.log('Error on logout:', err);
      });
    this.setState({id: ''});
  }

  isAuthenticated() {
    return !!this.state.id;
  }

  setAuth(id) {
    this.setState({id: id});
  }

  render() {
    let component = this;
    if (!this.state.hasSession) {
      return (
        <div>Waiting for server</div>
      );
    }
    return (
      <main>
        <Switch>
          <Route exact path ='/' render={() => <Redirect to={{ pathname: '/main'}}/>}/>
          <Route path='/main' render={() => (component.isAuthenticated() ?
            (<Main id={this.state.id} logout={this.logout}/>)
            : (<Redirect to={{
              pathname: '/login',
              state: { from: component.location}}}/>)
          )}/>
          <Route exact path='/login' render={() => <Login setAuth={(id) => component.setAuth(id)}/>} />
        </Switch>
      </main>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));