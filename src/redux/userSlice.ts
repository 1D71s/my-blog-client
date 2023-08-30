import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from '../axios';

type Token = {
    token: string | null;
};


type FormForRegister = {
    username: string,
    email: string,
    password: string
}

type FormForLogin = {
    email: string,
    password: string
}


type LoginResponse = {
    message: string,
    token: string,
    id: string 
}

type RegisterResponse = {
    message: string,
}

type ForInitialState = {
    user: null | FormForRegister,
    loading: boolean,
    token: null | string,
    status: null | string 
}

type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    token: string
}

export const registerUser = createAsyncThunk<RegisterResponse,FormForRegister >('user/registerUser', async ({ username, password, email }) => {
    try {
      const { data } = await axios.post('/auth/register', { username, password, email });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
});

export const loginUser = createAsyncThunk<LoginResponse, FormForLogin>('user/loginUser', async ({ password, email }) => {
    try {
        const { data } = await axios.post('/auth/login', { password, email });
        
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        } 
        
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getMe = createAsyncThunk<User>('user/getMe', async () => {
    try {
        const { data } = await axios.get('/auth/me');

        if (data.token) {
            window.localStorage.setItem('token', data.token)
        } 
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});



const initialState: ForInitialState  = {
    user: null,
    token: null,
    loading: false,
    status: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state) {
            state.user = null
            state.token = null
            state.status = 'Вы вышли из аккаунта'
        },
        clearStatus(state) {
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder
            //Registration
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = action.payload.message
            })

            //Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = action.payload.message
                state.token = action.payload.token
            })

            //Get Me
            .addCase(getMe.pending, (state) => {
                state.loading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.token = action.payload.token
            })

            //Errors
            .addMatcher(isRejectedWithValue(registerUser, loginUser), (state, action) => {
                state.status = action.payload as string
                state.loading = false
            })
    }
})

export const { logOut, clearStatus } = userSlice.actions

export const checkIsAuth = (state: Token): boolean => Boolean(state.token) 

export default userSlice.reducer
