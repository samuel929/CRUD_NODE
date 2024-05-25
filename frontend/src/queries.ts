import axios from 'axios';
import { User } from './types';
export const AddUsers = async (user: User): Promise<User[]> => {
    return await axios.post(`https://crud-node-3-8jhy.onrender.com/api/users`, {
        user
    });
};


export const fetchUsers = async (): Promise<User[]> => {
    const data = await axios.get(`https://crud-node-3-8jhy.onrender.com/api/users`,);
    return data.data.data;
};

export const DeleteUser = async (id: string | undefined): Promise<string> => {
    return await axios.delete(`https://crud-node-3-8jhy.onrender.com/api/users/${id}`,);

};


export const GetUser = async (id: string | undefined): Promise<string> => {
    return await axios.get(`https://crud-node-3-8jhy.onrender.com/api/users/${id}`,);
};



export const updateUser = async (data: User, id: string | undefined): Promise<any> => {
    return await axios.put(`https://crud-node-3-8jhy.onrender.com/api/users/${id}`, {
        data
    });
};
