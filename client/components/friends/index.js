import React from 'react';
import FriendCard from '../FriendCard.jsx';
import {Grid} from 'semantic-ui-react';
import './index.css';


class Friends extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changePage('friends');
  }

  render() {
    return (
      <div>
        <div className="friendsContainer">
          <div className="currentFriends">
            <div className="currentFriendsTitle">Current Friends</div>
            <div className="currentFriendsContainer">
              {this.props.friends.length ? this.props.friends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>) : (<div className="noFriends">You have no friends with that name!</div>)}
            </div>
          </div>
          <div className="currentFriends">
            <div className="currentFriendsTitle">Potential Friends</div>
            <div className="currentFriendsContainer">
              {this.props.potentialFriends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;


{ /* <Grid>
<Grid.Row>
  <Grid.Column width={2} >
  </Grid.Column>
  <Grid.Column width={12} >
    <div className="card-area">
      <br/>
    Friends
      <div className="ui stackable cards">
        <br/>
        {this.props.friends.length ? this.props.friends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>) : 'You have no friends with that name!'}
      </div>
      <br/>
    Potential Friends
      <div className="ui stackable cards">
        {this.props.potentialFriends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>)}
      </div>
    </div>
  </Grid.Column>
  <Grid.Column width={2} >
  </Grid.Column>
</Grid.Row>
</Grid> */ }