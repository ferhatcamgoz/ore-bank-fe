import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const transferMoney = createAsyncThunk(
    'transactions/transferMoney',
    async (transferData, thunkAPI) => {
        try {
            const response = await api.post('/transactions/transfer', transferData);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Transfer başarısız oldu');
        }
    }
);

export const fetchTransactionsByAccountId = createAsyncThunk(
    'transactions/fetchByAccountId',
    async (accountId, thunkAPI) => {
        try {
            const response = await api.get(`/transactions/account/${accountId}`);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'İşlem geçmişi alınamadı');
        }
    }
);