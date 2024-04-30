/* eslint-disable no-unused-vars */
import React from 'react'
import image from "../assets/image.png"
import { CiHome } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";


import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';




import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { USER_END_POINT_API } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';


const LeftSidebar = () => {
    const { user } = useSelector(store => store.user)
    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        try {
           

            const res = await axios.get(`${USER_END_POINT_API}/logout`)
            dispatch(getUser(null))
            dispatch(getOtherUsers(null))
            dispatch(getMyProfile(null))


           
            toast.success(res.data.message)
            navigate('/login')
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
       
    }
    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <img width={"24px"} className='ml-4 ' src={image} alt="" />
                </div>
                <div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <CiHome size="24px" />
                        </div>
                        <Link to="/" className='font-bold text-lg ml-2'>Home</Link>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <FaSearch size="24px" />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Explore</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <IoIosNotificationsOutline size="24px" />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Notification</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <CgProfile size="24px" />
                        </div>
                        <Link to={`/profile/${user?._id}`} className='font-bold text-lg ml-2'>Profile</Link>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <CiBookmark size="24px" />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                    </div>
                    <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <CiLogout size="24px" />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Logout</h1>
                    </div>
                    <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-lg font-bold '>Post</button>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar