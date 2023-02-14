import React, { useState } from 'react'
import {AiOutlineClose} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify';
import {createPostAction, updatePostAction} from "../redux/actions/post";
const Modal = () => {
    const [postData, setPostData] = useState({user:"", title:"", description:""});
    const dispatch = useDispatch();
    const {modal} = useSelector(state=>state.modal);
    console.log("modal değeri", modal);
    const onChangeFunction=(e)=>{
        setPostData({...postData, [e.target.name]: e.target.value});
    }
    const postCreate = () =>{
        if(modal?.updateId){
            dispatch(updatePostAction(modal?.updateId, postData));
            toast("güncelleme işlemi başarılı",{
                position:"top-right",
                autoClose: 5000,
            });
        }else{
            dispatch(createPostAction(postData));
            toast("ekleme işlemi başarılı",{
                position:"top-right",
                autoClose: 5000,
            });
        }
        dispatch({type:'MODAL', payload: false})
    }
  return (
    <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
        <div className='bg-white w-1/3 p-2 rounded-md'>
            <div onClick={()=>dispatch({type:'MODAL', payload: false})} className='flex items-center justify-between cursor-pointer'>
                <h1 className='font-bold text-2xl'>{modal?.updateId ? "POST GÜNCELLE" : "POST PAYLAŞ"}</h1>
                <AiOutlineClose size={25}></AiOutlineClose>
            </div>
            <div className='my-4 flex flex-col space-y-3'>
                <input type="text" value={postData.user} name="user" onChange={onChangeFunction} placeholder='User' className='input-style'></input>
                <input type="text" value={postData.title} name="title" onChange={onChangeFunction} placeholder='Title' className='input-style'></input>
                <input type="text" value={postData.description} name="description" onChange={onChangeFunction} placeholder='Description' className='input-style'></input>
            </div>
            <div onClick={postCreate} className='w-full p-2 text-center bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800'>{modal?.updateId ? "GÜNCELLE" : "PAYLAŞ"}</div>
        </div>
    </div>
  )
}

export default Modal;
