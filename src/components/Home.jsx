
import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'

import useOtherusers from '../hooks/useOtherusers'
import {  useSelector } from 'react-redux'
import useGetMyTweets from '../hooks/useGetMyTweets'
const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  },[])
 
  useOtherusers(user?._id)
  useGetMyTweets(user?._id)
  return (
      <div className='flex justify-between w-[80%] mx-auto m-4 p-4'>
          <LeftSidebar />
          <Outlet/>
      <RightSidebar otherUsers={ otherUsers} />
    </div>
  )
}

export default Home