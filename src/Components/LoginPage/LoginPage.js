import React, { Component } from 'react';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return(
            <div>
                <fieldset> 
                    <legend>LogIn</legend>
                    <form className='loginform'>
                        User Name <input required type= 'text' name='username'/>
                        <br/>
                        Password <input required type= 'password' name='password'/>
                        <br/>
                        <input type='submit' value='Login'></input>
                    </form>
                </fieldset>
            </div>
        )
    }
}