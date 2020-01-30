import React, { Component } from 'react';
import './RegisterPage.css';


export default class RegisterPage extends Component {
    render() {
        return(
            <div>
                <form className='form'>
                    <fieldset>
                        <label>First Name </label>
                        <input required type= 'text' name='username'/>
                        <br/>
                        <label>Last Name </label>
                        <input required type= 'text' name='username'/>
                        <br/>
                        <label>User Name </label>
                        <input required type= 'text' name='username'/>
                        <br/>
                        <label>Password </label>
                        <input required type= 'password' name='password'/>
                        <br/>
                        <label>Retype Password </label>
                        <input required type= 'password' name='password'/>
                        <br/>
                        <input type='submit' value='Build My Calendar'/>
                    </fieldset>
                </form>
            </div>
        )
    }
}