import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/user-context';
import UsersService from '../../Services/user-api-service';
import TokenService from '../../Services/token-service';
import './DeleteAccount.css';

export default class DeleteAccount extends Component {
    static contextType = UserContext;
    executeDeleteAccount = (id) => {
        UsersService.deleteUser(id)
        TokenService.clearAuthToken()
        this.context.clearUserInfo()
    };

    render(){
        if(!sessionStorage.user_id){
            return (
              <div className='maindiv'>
                <h4>Oops you arn't logged in!</h4>
                <div className=' oopsbutton'>
                  <Link 
                      className='button'
                      to='/'>
                      Home Page
                  </Link>
                </div>
              </div>
            )
          };
        return(
            <div className='maindiv'>
                <p className='deletequestion'>Are you sure you want to delete your account?</p>
                <div className='buttonbox'>
                    <Link to={'/'} className='deletebutton' onClick={() =>{this.executeDeleteAccount(this.context.user_id)}}>Yes!</Link>
                    <Link to={'/Home'} className='deletebutton' >No!</Link>
                </div>
                
            </div>
        );
    }
};