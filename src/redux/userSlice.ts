import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from '../utils/axios';
import { message } from "antd";

type Token = {
    token: string | null;
};

export type FullInfoType = {
    country: string,
    sity: string,
    myStatus: string,
    birthday: string,
    hobby: string,
    university: string,
    job: string,
    about: string,
}

export type FormForRegister = {
    username: string,
    email: string,
    password: string,
}

type FormForLogin = {
    username: string,
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
    user: null | User,
    loading: boolean,
    token: null | string,
    status: null | string,
    getMeStateLoading: boolean,
    theme: boolean,
    messages: null | number
}

export type User = {
    _id: string | any,
    username: string,
    email: string,
    password: string,
    token: string,
    useravatar: string,
    firstName: string,
    lastName: string,
    sex: string,
    fullInfo: FullInfoType,
    followers: string[],
    following: string[],
    favorite: string[]
    message?: string,
}

export const registerUser = createAsyncThunk<RegisterResponse,FormForRegister >('user/registerUser', async (user) => {
    try {
      const { data } = await axios.post('/auth/register', user);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
});

export const loginUser = createAsyncThunk<LoginResponse, FormForLogin>('user/loginUser', async ({ password, username }) => {
    try {
        const { data } = await axios.post('/auth/login', { password, username });
        
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
    getMeStateLoading: false,
    theme: true,
    messages: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state) {
            state.user = null
            state.token = null
            state.status = 'You are logged out of your account!'
            window.localStorage.removeItem('token')
        },
        clearStatus(state) {
            state.status = null
        },
        changeTheme(state) {
            state.theme = !state.theme
        },
        changeCountMessage(state, action) {
            state.messages = action.payload
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
                state.getMeStateLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.getMeStateLoading = false;
                if (action.payload.message === 'User is not found!') {
                    state.loading = false;
                    window.localStorage.removeItem('token');
                    logOut();
                } else {
                    state.user = action.payload;
                    state.token = action.payload.token;
                }
            })

            //Errors
            .addMatcher(isRejectedWithValue(registerUser, loginUser, getMe), (state, action) => {
                state.status = action.payload as string
                state.loading = false
                window.localStorage.removeItem('token')
                logOut()
            })
    }
})

export const { logOut, clearStatus, changeTheme, changeCountMessage } = userSlice.actions

export const checkIsAuth = (state: Token): boolean => Boolean(state.token) 

export default userSlice.reducer
