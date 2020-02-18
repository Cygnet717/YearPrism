import React, { Component } from 'react';
import UserApiService from '../../Services/user-api-service';
import UserContext from '../../Context/user-context';
import TokenService from '../../Services/token-service';
import './RegisterPage.css';

export default class CreateAccount extends Component {
  static contextType = UserContext;
  constructor(props){
    super(props)
    this.state ={
      error: null,
    }
  }

  handleSubmitNewUser = ev => {
    ev.preventDefault()
    this.setState({ error: null})
    const { username, birthyear, password} = ev.target
        
    UserApiService.postUser({
      username: username.value,
      birthyear: birthyear.value,
      password: password.value,
    })
    .then(res => {
      username.value = ''
      this.context.updateUser(res.user)
  		TokenService.saveAuthToken(res.authToken, res.user.user_id)
        if(this.state.error === null){
          this.props.complete()
        }
    })
    .catch(res => {
      this.setState({ error: res.error })
    })   
	}
	
  render() {
    return(
      <div>
      	<form className='form' onSubmit={this.handleSubmitNewUser}>
          <fieldset>
            <legend>Create Account</legend>
              <label>User Name </label>
              <input required type= 'text' name='username'/>
              <br/>
              <label>Birth Year</label>
              <input required type='number' min='1900' max='2060' name='birthyear'/>
              <br/>
              <label>Password </label>
              <input required type= 'password' name='password'/>
              <br/>
              <span className='criteria'>*Must be 8 characters long and inclue Capital, number, and one of #?!@$%^&*-</span>
              <br/>
              <input type='submit' value='Build My Calendar'/>
          </fieldset>
        </form>
      	<div role='alert'>
          {this.state.error && <p className='red'>{this.state.error}</p>}
        </div>
  		</div>
    )
  }
}