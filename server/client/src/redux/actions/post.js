import axios from "axios";
import { toast } from 'react-toastify';

export const getPostAction = () => async(dispatch) =>{
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_LOC_HOST}/getPosts`);
        dispatch({type:'GET_POSTS', payload: data});
    }catch(error){
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            });
    }
}

export const createPostAction = (postData) => async(dispatch) =>{
    try{
        const {data} = await axios.post(`${process.env.REACT_APP_LOC_HOST}/createPost`, postData);
        dispatch({type:'CREATE_POST', payload: data});
    }catch(error){
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            });
    }
}

export const updatePostAction = (id, postData) => async(dispatch) =>{
    try{
        const {data} = await axios.patch(`${process.env.REACT_APP_LOC_HOST}/updatePost/${id}`, postData);
        dispatch({type:'UPDATE_POST', payload: data});
    }catch(error){
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            });
    }
}

export const deletePostAction = (id) => async(dispatch) =>{
    try{
        axios.delete(`${process.env.REACT_APP_LOC_HOST}/deletePost/${id}`);
        dispatch({type:'DELETE_POST', payload: id});
    }catch(error){
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            });
    }
}
