import React, { Component } from 'react';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return(
            <div>
                <form className='loginform form'>
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