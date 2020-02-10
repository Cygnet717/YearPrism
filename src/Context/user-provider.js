import React, { Component } from 'react';
import UserContext from './user-context';
import dummyData from '../Components/dummy-store';
//import config from '../Config';



class UserProvider extends Component {
    state ={
        user_id: dummyData.UserInfo.user_id,
        birthyear: dummyData.UserInfo.birthyear,
        events: dummyData.events,
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