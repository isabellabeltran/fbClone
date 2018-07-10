import React from 'react';
import { Card, Image, Form, Grid, TextArea, Button, Icon, Dropdown, Label, Header } from 'semantic-ui-react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';
import axios from 'axios';
import moment from 'moment';
import Chat from '../chat/Chat.jsx';
import Dropzone from 'react-dropzone';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      join: '',
      profilePic: '',
      friends: [],
      viewId: this.props.wallId,
      currentMsg: '',
      messages: [],
      newMsg: '',
      getFriends: this.props.id,
    };
    console.log('status: ', this.state.status);
    this.saveUserEditInformation = this.saveUserEditInformation.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  getFriends(id = this.state.getFriends) {
    let component = this;
    axios.get('/friends/' + id)
      .then(response => {
        if (response.data && response.data.length > 0) {
          component.setState({
            friends: response.data
          });
        }
      })
      .catch(err => {
        console.log('error getting friends:', err);
      });
  }

  saveUserEditInformation() {
    let component = this;
    const profileUpdate = {
      treats: this.props.userInfo.treats,
      status: this.props.userInfo.status,
      id: this.props.id
    };

    axios.post('/editprofile', profileUpdate)
      .then( response => {
        console.log('Response ', response);
        component.props.friendProfile(component.props.id);
      })
      .catch( err => {
        console.log('Error ', err);
      });
  }

  handleStateChange(e) {
    const { name, value } = e.target; 
    this.setState({
      [name]: value
    }); 
  }

  handleDrop(files) {
    const handleThis = this;
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'qsfgq2uy'); // Replace the preset name with your own
      formData.append('api_key', '482543561232562'); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);
    
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post('https://api.cloudinary.com/v1_1/ushanka/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        const resizedURL = [fileURL.slice(0, 48), 'w_300,h_300/', fileURL.slice(48)].join('');
        axios.post('/upload', {
          url: resizedURL,
          userid: this.props.id
        }).then(function(response) {
          console.log('saved to the db, response', response);
          handleThis.props.friendProfile(handleThis.props.id);
        });
      })
        .catch(err => {
          console.log(err);
        });
    });
  }

  componentDidMount() {
    this.getFriends();
    this.props.changePage('homepage');
  }

  render() {
    return (
      <div className="container-full-page">
        <div className="img-container">
          <img src='https://i.imgur.com/j1h9yGv.jpg' /> 
        </div>
        <div className='profile-picture'>
          {this.props.id === this.props.wallId ?
            (<Dropzone className='dropzone' onDrop={this.handleDrop} accept="image/*">
              <img src={this.props.userInfo.profilePic} />
            </Dropzone>) :
            (<img className='dropzone' src={this.props.userInfo.profilePic} />)
          }
          <div className='username-on-image'>
            <h1>{this.props.userInfo.username.toUpperCase()}</h1>
          </div>
        </div> 
        <div className="friends-list">
          {
            this.state.friends.length ? (
              this.state.friends.map(friend =>
                <div className='each-friend' key={friend.full_name}>
                  <div className='each-friend-name'>
                    {friend.full_name.toUpperCase()}
                  </div> 
                  <div>                      
                    <img className='friend-image' src={friend.profile_picture} onClick={() => this.props.friendProfile(friend.id)} onClick={() => this.getFriends(friend.id)} onClick={() => this.props.setWallId(friend.id)} key={friend.id} />
                  </div>
                </div>
              )) : (
              null
            )
          }
        </div>
        <div className="secondMainContainer">
          { this.props.id === this.props.wallId ? 
            (<div className="userInfoContainer">
              <div className="uIContainertitle">
                <div className="personalInfoIcon"><FontAwesomeIcon icon="globe-americas" size="lg" /> </div> 
              Intro 
              </div>
              <div className="statusContainer">
                <label className="personalInfoLabel">Add a temporary bio:</label>
                <input name="status" onChange={(e) => this.props.setProfileInfo('status', e.target.value)} className="statusInput" /> 
                <div onClick={this.saveUserEditInformation} className="statusIcon"><FontAwesomeIcon icon="plus" size="lg" /></div> 
              </div>
              <div className="treatsContainer">
                <label className="treatsLabel">Treats so far: </label>
                <div className="treatsDropdown">
                  <button className="treatsBtn">{this.props.userInfo.treats || 'treats'}</button> 
                  <div className="treatsdrop">
                    <div onClick={this.saveUserEditInformation} onClick={(e) => this.props.setProfileInfo('treats', '0 - 3')}>0 - 3</div>
                    <div onClick={this.saveUserEditInformation} onClick={(e) => this.props.setProfileInfo('treats', '4 - 7')}>4 - 7</div>
                    <div onClick={this.saveUserEditInformation} onClick={(e) => this.props.setProfileInfo('treats', '8++')}>8++</div>
                  </div>
                </div>
              </div>
            </div>)
            :
            (
              <div className="userInfoContainer">
                <div className="uIContainertitle">
                  <div className="personalInfoIcon"><FontAwesomeIcon icon="globe-americas" size="lg" /> </div> 
                    Intro 
                </div>
                <div className="statusContainer">
                  <label className="friendViewStatus">Current status:</label>
                  <div className="friendViewStatusDiv">{this.props.userInfo.status}</div>
                </div>
                <div className="statusContainer">
                  <label className="friendViewStatus">Treats so far:</label>
                  <div className="friendViewStatusDiv">{this.props.userInfo.treats}</div>
                </div>
              </div>
            )
          }
          <div className="userComments">
            <PostInput id={this.props.id} wallId={this.props.wallId} profilePic={this.props.userInfo.profilePic} fetchPostFeed={this.props.fetchPostFeed}/>
            <PostList id={this.props.id} posts={this.props.posts} fetchPostFeed={this.props.fetchPostFeed}/>
          </div>
        </div>
      </div> 
    );
  }
}


export default HomePage;

