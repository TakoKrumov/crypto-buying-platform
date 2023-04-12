import * as requester from './requester';

const baseUrl = `http://localhost:3030/users`;


export const login = (data) => requester.post(`${baseUrl}/login`, data);

export const register = (data) => requester.post(`${baseUrl}/register`, data);

export const logout = () => requester.get(`${baseUrl}/logout`);