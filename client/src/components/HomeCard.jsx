import React from 'react';
import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { deletePostAction } from "../redux/actions/post";
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux";

const HomeCard = ({post}) => {
    const dispatch = useDispatch();

    const deletePost = (id) => {
            dispatch(deletePostAction(id))
            // window.location.reload();
            toast("silme işlemi başarılı", {
                position:"top-right",
                autoClose: 5000,
            });
    }
    const updatePost = (id) => {
        dispatch({type:'MODAL', payload: {open: true, updateId: id}});
    }
  return (
    <div className='relative w-1/4 border p-3 rounded-md bg-gray-50 ml-5 mb-5'>
        <div className='font-bold text-xl'>{post?.title}</div>
        <div className='font-bold text-xl'>{post?.description}</div>
        <div className='flex items-center justify-between mt-4'>
            <span className='text-xs text-gray-500'>{post?.user}</span>
            <span className='text-xs text-gray-500'>{(post?.date)?.substring(0,10)}</span>
        </div>
        <div className='absolute -top-3 -right-3 flex items-center space-x-3'>
            <AiOutlineDelete onClick={()=> deletePost(post._id)} size={22} className="bg-red-500 rounded-full text-white p-1 cursor-pointer"></AiOutlineDelete>
            <GrUpdate onClick={()=> updatePost(post._id)} size={22} className="bg-green-500 rounded-full text-white p-1 cursor-pointer"></GrUpdate>
        
        </div>
    </div>
    
  )
}

export default HomeCard;
