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

const initialState = {
    loading: false,
    status: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = action.payload.message
            })
    }
})

export default postSlice.reducer