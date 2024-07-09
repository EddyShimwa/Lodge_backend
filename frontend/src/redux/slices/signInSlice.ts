import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface SignInState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface RejectValue {
  message: string;
}

const tokenFromStorage = localStorage.getItem('token');
let userFromStorage: User | null = null;
if (tokenFromStorage) {
  const userString = localStorage.getItem('user');
  userFromStorage = userString ? JSON.parse(userString) : null;
}

export const initialState: SignInState = {
  token: tokenFromStorage,
  user: userFromStorage,
  loading: false,
  error: null,
  message: null,
};

const apiUrl = 'https://lodge-backend.onrender.com/api/auth/login';
export const loginUser = createAsyncThunk<LoginResponse, Credentials, { rejectValue: RejectValue }>(
  'signIn/loginUser',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const response = await axios.post(apiUrl, credentials);
      return response.data;
    } catch (error) {
      let errorMessage = 'Invalid credentials';
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        user: null,
        message: 'Logout Successfully',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
      message: null,
    }));
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      const { token, user, message } = action.payload;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    
      return {
        ...state,
        loading: false,
        message,
        token,
        user,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload.message : 'Login failed',
        message: null,
      };
    });
  },
});

export const { logout } = signInSlice.actions;
export default signInSlice.reducer;
