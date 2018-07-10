import React from 'react'; 
// import { Image, Form, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
import './index.css';
import {Redirect} from 'react-router-dom';
import LoginHeader from '../appheader/LoginHeader.jsx';
import logo from '../../images/logopb.png';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      fullName: '',
      newUsername: '',
      newPassword: '',
      isLoggedIn: false
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  userAllInputFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCreateAccount(event) {
    event.preventDefault();
    bcrypt.genSaltAsync(10) 
      .then(salt => {
        bcrypt.hashAsync(this.state.newPassword, salt, null)
          .then(hashedPassword => {
            const newUserInfo = {
              fullName: this.state.fullName,
              newUsername: this.state.newUsername,
              newPassword: hashedPassword,
              profilePicture:
                'https://source.unsplash.com/300x300/?featured/?dog,cat,robots'
            };
            let component = this;
            axios
              .post('/newAccount/', newUserInfo)
              .then(response => {
                if (response.data === 'exists') {
                  alert('Username is taken! Choose a new one.');
                } else if (response.data.id) {
                  component.props.setAuth(response.data.id);
                  component.setState({
                    isLoggedIn: true
                  });
                }
              })
              .catch(err => {
                console.log('Error from handleCreateAccount', err);
              });
          });
      });
  }

  handleLogin(event) {
    event.preventDefault();
    let component = this;
    console.log('FROM LOGIN.JSX', this.state.username);
    axios
      .get(`/Login/${this.state.username}/${this.state.password}`)
      .then(response => {
        if (response.data === 'wrong') {
          alert('Wrong username or password!');
        } else {
          component.props.setAuth(response.data.id);
          component.setState({
            isLoggedIn: true
          });
        }
      })
      .catch(err => {
        console.log('Error from handleLogin', err);
      });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect to={'/main'}/>
      );
    }
    return (
      <div>
        {/* HEADER */}
        <div className="header">
          <div className="row">
            <div className="col-1-of-2">
              <div className="logoNameContainer">
                <img className="logo" src={logo} /> 
                <div className="appName">
              petBook
                </div> 
              </div>
            </div>
            <div className="col-1-of-2">
              <form className="loginForm" onSubmit={this.handleLogin.bind(this)}>
                <div className="loginContainer">
                  <div className="label">Email</div>
                  <input onChange={this.userAllInputFieldsChange.bind(this)} className="input" name="username" /> 
                </div> 
                <div className="loginContainer">
                  <div className="label">Password</div>
                  <input onChange={this.userAllInputFieldsChange.bind(this)} className="input" name="password" type="password" />
                </div> 
                <input className="loginBtn" type="submit" value="Log In" />
              </form>
              <div className="forgotAccount">
                <a>Forgot Account?</a> 
              </div>
            </div>
          </div>
        </div>
        {/* CREATE ACCOUNT */}
        <div className="mainLoginContainer">
          <div className="row">
            <div className="col-1-of-2">
              <div className="leftContainer">
              
              </div>
            </div>
            <div className="col-1-of-2">
              <div className="rightContainer">
                <div className="caTitle">
                Create a New Account 
                </div>
                <div className="caSubTitle">
                It's free and always will be  
                </div>

                <form className="form" onSubmit={this.handleCreateAccount}>
                  <input onChange={this.userAllInputFieldsChange.bind(this)} className="input1" name="fullName" placeholder="First name"/>

                  <div className="formContainer">
                    <input onChange={this.userAllInputFieldsChange.bind(this)} className="input2" name="newUsername" placeholder="Username"/>
                    <input onChange={this.userAllInputFieldsChange.bind(this)} className="input2" type="password" name='newPassword' placeholder="New Password"/>
                  </div>

                  <div className="formContainer">
                By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
                  </div>
                  <input className="formBtn" type="submit" value="Sign Up" />
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
  } 
}

export default Login;


{ /* <header className='login-header' >
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form>
                  <Form.Field inline>
                    <h1>ushanka icon placeholder</h1>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form className='user-login' onSubmit={this.handleLogin} >
                  <Form.Group >
                    <Form.Input name='username' size={'small'} placeholder='username' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Form.Input name='password' size={'small'} type='password' placeholder='password' autoComplete='off' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Button type='submit'>Login</Button>
                  </Form.Group>
                </Form> 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </header>
        <div>
          <Grid>
            <Grid.Column width={8} className='left-side-Login' >
              <div className='left-picture' >
                <Image src='https://source.unsplash.com/300x300/?featured/?dog,cat,robots' size='large' rounded/>
              </div>
            </Grid.Column>
            <Grid.Column width={8} >
              <Form className='STARTING-FORM' onSubmit={this.handleCreateAccount} > 
                <Grid.Row className='create-account'>
                  <h1>Create a new account </h1>
                </Grid.Row>
                <Grid.Row className='full-name-row'>
                  <Form.Input name='fullName' size={'small'} placeholder='Full name' width={14} onChange={this.userAllInputFieldsChange.bind(this)}/>
                </Grid.Row>
                <Grid.Row className='new-username-password'>
                  <Form.Group>
                    <Form.Input name='newUsername' size={'small'} placeholder='New username ' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Form.Input name='newPassword' size={'small'} placeholder='New password ' type='password' autoComplete='off' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row className='funny-stuff-cc-ssn'>
                  <Form.Group>
                    <Form.Input size={'small'} placeholder='Credit card information ' width={8} />
                    <Form.Input size={'small'} placeholder='Social security number ' width={6} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row className='funny-stuff-bd-ad'>
                  <Form.Group>
                    <Form.Input size={'small'} placeholder='Birthday ' width={7} />
                    <Form.Input size={'small'} placeholder='Address ' width={7} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row >
                  <Grid.Column width={8}>
                    <h6>
            By clicking Create Account, you agree to our Terms and that you have read our 
            Data Policy, including our Cookie Use. You may receive SMS Notifications from 
            ushanka and can opt out at any time.
                    </h6>
                  </Grid.Column>
                  <Grid.Column width={8} >
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className='agree-terms'>
                  <Form.Checkbox
                    inline
                    label='I agree to the terms and conditions'
                    required />
                </Grid.Row>
                <Grid.Row className='create-account'>
                  <Button type='submit'>Create Account</Button>
                </Grid.Row>
              </Form>
            </Grid.Column>
          </Grid>
        </div> */ }