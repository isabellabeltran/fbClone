import React from 'react';
const axios = require('axios');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { Form, Button, Input } from 'semantic-ui-react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      toFriends: false,
      mounted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchFriends = this.searchFriends.bind(this);
    this.preventRedirect = this.preventRedirect.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  searchFriends(e) {
    var searchThis = this;
    axios.get('/friends', {
      params: {
        term: searchThis.state.searchTerm,
        id: searchThis.props.id,
      }
    })
      .then(function (res) {
        console.log('inside', res);
        searchThis.props.onChange(res);
        searchThis.setState({
          searchTerm: '',
          toFriends: true,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    e.preventDefault();
  }

  preventRedirect() {
    this.setState({
      toFriends: false,
    });
  }


  render() {
    if (this.state.toFriends && this.props.currentPage !== 'friends') {
      if (this.state.mounted) {
        this.preventRedirect();
        return <Redirect to={{
          pathname: '/main/friends',
        }}/>;
      }
    }
    return (
      <div className="sContainer">
        <input className="searchInput" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search for friends" />
        <div onClick={this.searchFriends} ><FontAwesomeIcon className="searchBtn" icon="search" size="2x" /></div>
      </div>
    );
  }
}

export default SearchBar;


// <div>
{ /* <form className="searchForm" onSubmit={this.searchFriends}>
          <input className="searchInput" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search for friends" />
          <input className="searchBtn" type="submit" value="search"/>  
        </form> 
      </div> */ }