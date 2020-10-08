import React, { FC } from 'react';
import { UsersType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
    totalUsersCount: number 
    pageSize: number
    currentPage: number 
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


let Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return  <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                           totalItemsCount={totalUsersCount} pageSize={pageSize} />
                <div>
                    {
                        users.map(u => <User user={u} 
                                            key={u.id} 
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                                            /> )
                        
                    }
                </div>
            </div>        
}

export default Users;