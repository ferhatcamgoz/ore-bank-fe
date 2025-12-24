import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await api.post('/users/register', { username, email, password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Registration failed. Please verify your details and try again.'
            );
        }
    }
);


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await api.post('/users/login', { username, password });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Login failed. Please verify your username and password.'
            );
        }
    }
);