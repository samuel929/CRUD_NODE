import axios from 'axios';
import { User } from './types';

export const AddUsers = async (user: User): Promise<User[]> => {
    return await axios.post('http://localhost:3000/api/users', {
        user
    });
};


export const fetchUsers = async (): Promise<User[]> => {
    const data = await axios.get('http://localhost:3000/api/users',);
    return data.data.data;
};

export const DeleteUser = async (id: string | undefined): Promise<string> => {
    return await axios.delete(`http://localhost:3000/api/users/${id}`,);

};


export const GetUser = async (id: string | undefined): Promise<string> => {
    return await axios.get(`http://localhost:3000/api/users/${id}`,);
};



export const updateUser = async (data: User, id: string | undefined): Promise<any> => {
    return await axios.put(`http://localhost:3000/api/users/${id}`, {
        data
    });
};
