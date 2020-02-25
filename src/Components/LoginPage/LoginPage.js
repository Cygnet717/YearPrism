import React, { Component } from 'react';
import UserApiService from '../../Services/user-api-service';
import TokenService from '../../Services/token-service';
import UserContext from '../../Context/user-context';
import thinking from '../../Images/spinner.gif';
import './LoginPage.css';

export default class LoginPage extends Component {
  static contextType = UserContext;
  constructor(props){
    super(props);
    this.state = { 
      error: null, 
      thinking: false,
    }
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/Home'
    history.push(destination)
  };

  handleSubmitLogin = ev => {
    ev.preventDefault();
    this.setState({ 
      error: null,
      thinking: true,
    });
    const { username, password} = ev.target;
    UserApiService.postLogin({
      username: username.value,
      password: password.value,
    })
    .then(res => {
        username.value = ''
        password.value = ''
        this.context.updateUser(res.user)
        TokenService.saveAuthToken(res.authToken, res.user.user_id)
        this.handleLoginSuccess(res.user.user_id)
    })
    .catch(res => {
      this.setState({ 
        error: res.error,
        thinking: false,
       })
    })
  };

  render() {
    return(
      <div className='maindiv'>
        <form className='loginform form' onSubmit={this.handleSubmitLogin}>
          <fieldset> 
            <legend>LogIn</legend>
            Username <input required type= 'text' name='username'/>
            <br/>
            Password <input required type= 'password' name='password'/>
            <br/>
            <input type='submit' value='Login'></input>
          </fieldset>
        </form>
        {this.state.thinking && this.state.error === null? <img id='thinking' src={thinking} alt='loading...'/>: <span></span>}
        <div role='alert'>
          {this.state.error && <p className='red'>{this.state.error}</p>}
        </div>
      </div>
    )
  }
};