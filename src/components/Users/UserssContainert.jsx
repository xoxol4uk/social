import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users;
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userID));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userID));
        },
        setUsers: (users) => {
            dispatch(setUserAC(users));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps) (Users);

export default UsersContainer; 