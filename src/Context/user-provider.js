import React, { Component } from 'react';
import UserContext from './user-context';
import dummyData from '../Components/dummy-store';
import config from '../Config';



class UserProvider extends Component {
    state ={
        user_id: window.sessionStorage.user_id,
        birthyear: window.sessionStorage.birthyear,
        username: window.sessionStorage.username,
        events: dummyData.events,
        updateUser: (user) => {
            window.sessionStorage.setItem(config.USER_ID, user.user_id)
            window.sessionStorage.setItem(config.USERNAME, user.username)
            window.sessionStorage.setItem(config.BIRTHYEAR, user.birthyear)
        },

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