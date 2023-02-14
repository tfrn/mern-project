import React, { useState } from 'react'
import { registerAction, loginAction } from '../redux/actions/auth';
import { useDispatch } from "react-redux";

const Auth=()=> {

  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState({username:"", email:"", password:""}); 

  const dispatch = useDispatch();

  const handleSubmit =(e)=>{
    setAuthData({...authData, [e.target.name] : e.target.value});
  }
  const authFunction = () => {
    if(signUp){
      dispatch(registerAction(authData));
    }else{
      dispatch(loginAction(authData));
    }
  }

  console.log("authData", authData);

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className='w-1/3 bg-white p-3'>
        <h1 className='text-2xl text-gray-700 font-bold'>{signUp ? "register": "login"}</h1>
        <div className='flex flex-col space-y-3 my-5'>
          {signUp && <input value={authData.username} name="username" onChange={handleSubmit} type="text" placeholder='username' className='input-style'/>}
          <input value={authData.email} name="email" onChange={handleSubmit} type="text" placeholder='email' className='input-style'/>
          <input value={authData.password} name="password" onChange={handleSubmit} type="text" placeholder='password' className='input-style'/>
        </div>
        <div className='text-red-500 text-xs cursor-pointer mb-4'>
          {
            signUp ? <span onClick={()=>{setSignUp(false)}}>daha önce giriş yaptınız mı?</span> : <span onClick={()=>{setSignUp(true)}}>kayıt olmak için tıklayın.</span>
          }
        </div>
        <div onClick={authFunction} className='cursor-pointer hover:bg-indigo-800 w-full p-2 text-center bg-indigo-600 text-white rounded-md'>{signUp ? "register": "login"}</div>
      </div>  
    </div>
  )
}

export default Auth;
