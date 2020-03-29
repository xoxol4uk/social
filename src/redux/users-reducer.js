const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialeState = {
    users: [
        {id: 1, fullName: 'Dmitry', status:'I am a boss', location: {city: 'Minsk', country: 'Belarus', followed: true,} },
        {id: 2, fullName: 'Sandron', status:'I am main boss', location: {city: 'Kiev', country: 'Ukraine', followed: true} },
        {id: 3, fullName: 'Ivan', status:'I am suber boss', location: {city: 'Moscow', country: 'Russia', followed: false} },
        {id: 4, fullName: 'Egor', status:'I am not boss', location: {city: 'Minsk', country: 'Belarus', followed: true} },
    ]
};

const usersReducer = (state = initialeState, action) => {
    switch(action.type) {
      case FOLLOW:
        return { 
            ...state, 
            users: state.users.map(u => {
                if (u.id === action.userID) {
                    
                }
               return u;
            })
        }
      case UNFOLLOW:
        return { 
            ...state, 
            users: state.users.map(u => {
                if (u.id === action.userID) {
                    return (...u, followed = false);
                }
               return u;
            })
        }
      case SET_USERS: 
        return {...state, users: [...state.users, ...action.users]}

        }
        default: 
            return state;
        
    }
}

export const followAC  = (userID) => ({type: FOLLOW, userID});
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID});
export const setUsersAC = (users) => ({ type: SET_USERS, users});

export default usersReducer;