import React from 'react';
import styles from './users.module.css';


let Users = (props) => {

    if (props.users.length  === 0) {
        props.setUsers([
                {id: 1, photoUrl: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-128.png', fullName: 'Dmitry', status:'I am a boss', location: {city: 'Minsk', country: 'Belarus'}, followed: true },
                {id: 2, photoUrl: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-128.png', fullName: 'Sandron', status:'I am main boss', location: {city: 'Kiev', country: 'Ukraine'}, followed: true },
                {id: 3, photoUrl: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-128.png', fullName: 'Ivan', status:'I am suber boss', location: {city: 'Moscow', country: 'Russia'}, followed: false },
                {id: 4, photoUrl: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-128.png', fullName: 'Egor', status:'I am not boss', location: {city: 'Minsk', country: 'Belarus'}, followed: true },
            ]
        )
    }
    return (
    <div>
        {
        props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl} className={styles.userPhoto} alt=""/>
                </div>
                <div>
                    {u.followed 
                    ? <button onClick={ () => {props.unfollow(u.id)}}>Unfollow</button> 
                    : <button onClick={ () => {props.follow(u.id)}}>Follow</button>}
                    
                </div>
            </span>
            <span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                <div>{u.location.country}</div>
                <div>{u.location.city}</div>
                </span>
            </span>
            
            </div>
        )
    }
    </div>
    )
}

export default Users;