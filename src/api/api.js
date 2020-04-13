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
        return instance.get(`profile/${userId}`);
       
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    }
}


