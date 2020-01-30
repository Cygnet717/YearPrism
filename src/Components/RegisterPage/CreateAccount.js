import React, { Component } from 'react';
import './RegisterPage.css';

export default class CreateAccount extends Component {
    nextSection(event){
        event.preventDefault();
        this.props.complete()
    }

    render() {
        return(
            <div>
                <form className='form' onSubmit={(e) => {this.nextSection(e)}}>
                    <fieldset>
                        <legend>Create Account</legend>
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
                        <span className='criteria'>*Must be 8 characters long and inclue Capital, number, and one of #?!@$%^&*-</span>
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