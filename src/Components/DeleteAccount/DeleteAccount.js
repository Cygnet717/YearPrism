import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DeleteAccount.css'

export default class DeleteAccount extends Component {
    executeDeleteAccount(){
        console.log('Boop! Deleted')
    }

    render(){
        return(
            <div>
                <p className='deletequestion'>Are you sure you want to delete your account?</p>
                <div className='buttonbox'>
                    <Link to={'/'} className='deletebutton' onClick={this.executeDeleteAccount}>Yes!</Link>
                    <Link to={'/Home'} className='deletebutton' >No!</Link>
                </div>
                
            </div>
        )
    }
}