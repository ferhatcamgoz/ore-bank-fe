import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchAccounts = createAsyncThunk(
    'accounts/fetchAccounts',
    async ({ number = '', name = '' }, thunkAPI) => {
        try {
            const response = await api.post('/accounts/search', null, {
                params: { number, name },
            });
            return response.data.data.content;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Hesaplar alınamadı');
        }
    }
);

export const createAccount = createAsyncThunk(
    'accounts/createAccount',
    async ({ name, balance }, thunkAPI) => {
        try {
            const response = await api.post('/accounts', {
                name,
                balance,
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to create account'
            );
        }
    }
);

export const fetchAccount = createAsyncThunk(
    'accounts/fetchAccount',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/accounts/${id}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Hesap alınamadı');
        }
    }
);

// Hesap güncelleme için thunk
export const updateAccount = createAsyncThunk(
    'accounts/updateAccount',
    async ({ id, name }, thunkAPI) => {
        try {
            const response = await api.put(`/accounts/${id}`, { name });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Hesap güncellenemedi');
        }
    }
);

// Hesap silme için thunk
export const deleteAccount = createAsyncThunk(
    'accounts/deleteAccount',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/accounts/${id}`);
            return id;  // Silinen hesap id'sini dönebiliriz
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Hesap silinemedi');
        }
    }
)
