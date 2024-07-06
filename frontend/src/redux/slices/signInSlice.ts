import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { showErrorToast, showSuccessToast } from '@/utils/ToastConfig';

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface SignInState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  role: string | null;
}

interface DecodedToken {
  user: User;
}

interface LoginResponse {
  token: string;
  message: string;
  user: {
    id: number;
    email: string;
  };
}

interface Credentials {
  email: string;
  password: string;
}

const tokenFromStorage = localStorage.getItem('token');

let userFromToken: User | null = null;

if (tokenFromStorage) {
  try {
    const decodedToken = jwtDecode<DecodedToken>(tokenFromStorage);
    userFromToken = {
      _id: decodedToken.user._id,
      firstName: decodedToken.user.firstName,
      lastName: decodedToken.user.lastName,
      email: decodedToken.user.email,
      role: decodedToken.user.role,
    };
  } catch (error) {
    localStorage.removeItem('token');
  }
}

export const initialState: SignInState = {
  token: tokenFromStorage,
  user: userFromToken,
  loading: false,
  error: null,
  message: null,
  role: null
};

const apiUrl = `${process.env.VITE_BASE_URL}/user/login`;
export const loginUser = createAsyncThunk<LoginResponse, Credentials>(
  'signIn/loginUser',
  async (credentials: Credentials, thunkAPI) => {
    return axios
      .post(apiUrl, credentials)
      .then((response) => {
        // showSuccessToast(response.data.message);
        return response.data;
      })
      .catch((error) => {
        // showErrorToast(error.response.data.message);
        return thunkAPI.rejectWithValue(
          error.response.data || 'An error occurred'
        );
      });
  }
);

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        role: null,
        message: 'Logout Successfully',
      };
    },

  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const newToken = action.payload.token;


        localStorage.setItem('token', newToken!);

        let decodedUser = null;
        if (action.payload.token) {
          const decodedData = jwtDecode<DecodedToken>(action.payload.token);
          decodedUser = {
           _id: decodedData.user._id,
            firstName: decodedData.user.firstName,
            lastName: decodedData.user.lastName,
            email: decodedData.user.email,
            role: decodedData.user.role,

          };
        }

        return {
          ...state,
          loading: false,
          message: action.payload.message,
          token: newToken,
          user: decodedUser,
          role: jwtDecode<DecodedToken>(action.payload.token).user.role,

        };
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        message: null,
      };
    });


  },
});

export const { logout } = signInSlice.actions;

export default signInSlice.reducer;
