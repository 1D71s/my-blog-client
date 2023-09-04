import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

type PostForCreate = {
    image: string;
    text: string;
    title: string;
}

export const createPost = createAsyncThunk('post/createPost', async (params: PostForCreate) => {
    try {
        const { data } = await axios.post('posts/create', params)

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
})

export const getMyPosts = createAsyncThunk('post/getMyPost', async () => {
    try {
        const { data } = await axios.get('posts/myposts')

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
})

const initialState = {
    loading: false,
    status: null,
    myPosts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        clearStatus(state) {
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = action.payload.message
            })
        
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload.reverse()
            })
    }
})

export const { clearStatus } = postSlice.actions

export default postSlice.reducer