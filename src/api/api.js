import * as axios from 'axios';

const instance =  axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "7bed4946-9972-4e0e-bf8f-b616807e7b9c"}
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data; 
            });
    },
    follow(id) {
        return instance.post(`follow/${id}`)
        .then(response => {
            return response.data;
        });
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data;
            });
        },
    getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object.');
        return profileAPI.getProfile(userId); 
       
    }
}


export const profileAPI = {
   
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
       
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status});
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    }
}


