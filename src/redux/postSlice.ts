import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "../axios";

export type Posts = {
    _id: string;
    author: {
        id: string,
        useravatar: string;
        username: string;
    };
    image: string;
    title: string;
    text: string;
    views: number;
    comments: string;
    likes: string;
    createdAt: string;
}

type PostForCreate = {
    image: string;
    text: string;
    title: string;
}

type ForInitialStatePost = {
    myPosts: Posts[],
    loading: boolean,
    status: null | string,
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

export const deletePost = createAsyncThunk('post/deletePost', async (id: string) => {
    try {
        const { data } = await axios.delete(`posts/delete/${id}`)

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
})

const initialState: ForInitialStatePost = {
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
            //Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = action.payload.message
            })
            

            //Get My Post
            .addCase(getMyPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload.reverse()
            })
            
            //Delete Post
            .addCase(deletePost.pending, (state) => {
                state.loading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.myPosts = state.myPosts.filter(item => item._id !== action.payload.id)
                state.status = action.payload.message
            })


            //Errors
            .addMatcher(isRejectedWithValue(createPost, getMyPosts, deletePost), (state, action) => {
                state.status = action.payload as string
                state.loading = false
            })
    }
})

export const { clearStatus } = postSlice.actions

export default postSlice.reducer