import axios, { AxiosResponse } from 'axios';
import { Profiletype } from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "7bed4946-9972-4e0e-bf8f-b616807e7b9c" }
});


export const usersAPI = {
    requestUsers(page = 1, pageSize = 10) {
        return instance.get(`users?page=${page}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.');
        return profileAPI.getProfile(userId);

    }
}


export const profileAPI = {

    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);

    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put('profile/status', { status: status });
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: Profiletype) {
        return instance.put('profile', profile);
    }
}

export enum resultCodeEnum {
    Success = 0,
    Error = 1
}

export enum resultCodeForCapcthaEnum {
    CaptchaIsRequared = 10
} 

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: resultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: resultCodeEnum | resultCodeForCapcthaEnum
    messages: Array<string>
}


export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
        .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

instance.get<string>(`auth/me`).then((res: AxiosResponse<string>) => res.data)

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },

}
