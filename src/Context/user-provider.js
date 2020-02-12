import React, { Component } from 'react';
import UserContext from './user-context';
import config from '../Config';



class UserProvider extends Component {
    state ={
        user_id: '' || window.sessionStorage.user_id,
        birthyear: '' || window.sessionStorage.birthyear,
        username: '' || window.sessionStorage.username,
        authToken: '' || window.sessionStorage.authToken,
        events: [],
        updateUser: (user) => {
            console.log(user)
            this.setState({
                user_id: user.user_id,
                birthyear: user.birthyear,
                username: user.username
            })
            window.sessionStorage.setItem(config.USER_ID, user.user_id)
            window.sessionStorage.setItem(config.USERNAME, user.username)
            window.sessionStorage.setItem(config.BIRTHYEAR, user.birthyear)
        },
        updateEvents: (events) => {
            this.setState({
                events: events,
            })
        },
        clearUserInfo: () => {
            this.setState({
                user_id: null,
                birthyear: null,
                username: null
            })
        }

    };
    
    render() {
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
};


export default UserProvider;