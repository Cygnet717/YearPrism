import React, { Component } from 'react';
import UserApiService from '../../Services/user-api-service';
import TokenService from '../../Services/token-service';
import UserContext from '../../Context/user-context';
import './LoginPage.css';

export default class LoginPage extends Component {
    static contextType = UserContext;
  constructor(props){
    super(props)
    this.state = { 
      error: null, 
    }
  }

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/Home'
    history.push(destination)
  };

  handleSubmitLogin = ev => {
    ev.preventDefault()
    this.setState({ 
      error: null,
    })
    const { username, password} = ev.target
    UserApiService.postLogin({
      username: username.value,
      password: password.value,
    })
    .then(res => {
        console.log(res)
        username.value = ''
        password.value = ''
        this.context.updateUser(res.user)
        TokenService.saveAuthToken(res.authToken, res.user.user_id)
        this.handleLoginSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
      })
  }

    render() {
        return(
            <div>
                <form className='loginform form' onSubmit={this.handleSubmitLogin}>
                    <fieldset> 
                        <legend>LogIn</legend>
                        User Name <input required type= 'text' name='username'/>
                        <br/>
                        Password <input required type= 'password' name='password'/>
                        <br/>
                        <input type='submit' value='Login'></input>
                    </fieldset>
                </form>
            </div>
        )
    }
}