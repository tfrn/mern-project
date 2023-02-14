import React from 'react'
import { useSelector } from 'react-redux';
import HomeCard from '../components/HomeCard';

function Home() {
  const {posts} = useSelector(state => state.posts);
  if(posts.length !== 0){
    console.log("posts", posts)
  }else{
  }
  return (
    <div className='flex items-center m-5 flex-wrap'>
      {
        posts.length > 0 && posts?.map((post, i)=>(
          <HomeCard key={i} post={post}></HomeCard>
        ))
      }
    </div>
  )
}

export default Home;
