import React from 'react';
import {Form, Grid, Button, Input, Icon, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../images/logopb.png';
import './index.css';
import SearchBar from '../SearchBar.jsx';
import Chat from '../chat/Chat.jsx';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.backToUserProfile = this.backToUserProfile.bind(this);
  }
  backToUserProfile() {
    this.props.setWallId(this.props.id);
  }

  handleChatPage() {
    this.props.changePage('chat');
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="row">
            <div className="col-2">
              <div className="backHome">
                <img onClick={this.backToUserProfile} className="appLogo" src={logo} /> 
                <div className="appMainName">
                  {/* <Link className='name' to={'/main'}> HELLO WORLD </Link> */}
                </div> 
              </div>
              <div className="searchBar">
                <SearchBar onChange={this.props.onChange} currentPage={this.props.currentPage} id={this.props.id}/>
              </div>
            </div>
            <div className="col-3">
              {/* <div className="navContainer">
                <div className="link">
                  <a to={'/chat'}>Chat</a>  
                </div>
                <div className="icon" >&there4;</div>
                <div onClick={this.handleFriendsPage} className="link">
                Find Friends 
                </div>
                <div className="icon" >&there4;</div>

                <div onClick={this.handleTrendPage} className="link">
                Trending
                </div>
                <div className="icon" >&there4;</div>
              </div> */}
              <div onClick={this.props.logout} className="logoutContainer">
                <a>Log out</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppHeader;
