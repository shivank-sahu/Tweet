// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';

import useGetProfile from '../hooks/useGetProfile';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_END_POINT_API } from '../utils/constant';
import toast from 'react-hot-toast';
import { followUnfollow } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const { user, profile } = useSelector((store) => store.user);
    useGetProfile(id);

    const dispatch = useDispatch()
    const followUnfollowHandle = async () => {
   
        if (user.following.includes(id)) {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.post(`${USER_END_POINT_API}/unfollow/${id}`, { id: user?._id })
                console.log(res);

                
                
                dispatch(followUnfollow(id))
                
                
               dispatch(getRefresh())
                toast.success(res.data.message)
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error);
            }
        }
        else {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.post(`${USER_END_POINT_API}/follow/${id}`, { id: user?._id })
                console.log(res);

                dispatch(followUnfollow(id))
                dispatch(getRefresh())
                toast.success(res.data.message)
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error);
            }
        }
   } 
 
    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to='/' className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <FaArrowLeft size='24px' />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{`${profile?.name}`}</h1>
                        <p className='text-gray-500 text-sm'> 10 post </p>
                    </div>
                </div>
                <img width={2000} src='https://th.bing.com/th/id/OIP.KvyuOIHmN9JJ6JkNFLzsogHaCe?w=336&h=116&c=7&r=0&o=5&cb=10&pid=1.7' alt='' />
                <div className='absolute top-[275px] ml-2 border-white border-4 rounded-full'>
                    <Avatar src='https://pe-images.s3.amazonaws.com/photo-editing/cc/crop-image-circle/photoshop-crop-image-to-circle.jpg' size='120' round={true} />
                </div>
                <div className='text-right m-4'>
                    {profile?._id === user?._id ? (
                        <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit</button>
                    ) : (
                        <button  onClick={followUnfollowHandle} className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>{user?.following.includes(id) ? "Following": "Follow"}</button>
                    )}
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{`${profile?.name}`}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>helo i am web dev shivank sahu mern stack developer so meet </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
