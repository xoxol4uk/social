import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';




let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {

    return  <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                           totalItemsCount={totalUsersCount} pageSize={pageSize} />
                <div>
                    {
                        props.users.map(u => <User user={u} 
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