/* eslint-disable react/prop-types */

import Avatar from "react-avatar"
import { CiBookmark } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import axios from "axios"
import { TWEET_END_POINT_API, USER_END_POINT_API } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { getRefresh } from "../redux/tweetSlice";
// import { getUser } from "../redux/userSlice";
// import { useState } from "react";

const Tweet = ({ tweet }) => {
    // const [isBookmarked, setIsBookmarked] = useState(tweet?.bookmarks?.includes(user?._id));
    const deleteHandler = async (id) => {
        try {

            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_END_POINT_API}/delete/${id}`)
            console.log(res);
            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()

 
    const bookmarkHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.put(`${USER_END_POINT_API}/bookmark/${id}`, {id:user?._id}, {
                withCredentials: true
            });
            dispatch(getRefresh())
            // Update user state after bookmarking
            
            

           
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_END_POINT_API}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })


            dispatch(getRefresh())

            toast.success(res.data.message)

        } catch (error) {
            toast.success(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <div className="border-b border-gray-200">
            <div>
                <div className='flex p-4'>
                    <Avatar src="https://pe-images.s3.amazonaws.com/photo-editing/cc/crop-image-circle/photoshop-crop-image-to-circle.jpg" size="40" round={true} />

                    <div className="ml-2 w-full">
                        <div className='flex items-center '>
                            {/* // eslint-disable-next-line react/prop-types */}
                            <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                            <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}  .  1m`}</p>
                        </div>
                        <div>
                            <p>{tweet?.description}</p>
                        </div>

                        <div className='flex justify-between '>
                            <div className="flex items-center">
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>

                                    <FaRegComment size="20px" />
                                </div>
                                <p className='ml-1'>0</p>
                            </div>
                            <div className="flex items-center">
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer' onClick={() => likeOrDislikeHandler(tweet?._id)}>
                                    <CiHeart size="24px" />
                                </div>
                                <p className='ml-1'>{tweet?.like?.length}</p>
                            </div>
                            <div className="flex items-center">
                                <div onClick={() => bookmarkHandler(tweet?._id)} className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <CiBookmark size="24px" />
                                </div>
                                <p className='ml-1'>{tweet?.bookmarks?.length}</p>
                            </div>
                            {


                                user?._id === tweet?.userId && (
                                    <div onClick={() => deleteHandler(tweet?._id)} className="flex items-center">
                                        <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                            <RiDeleteBin6Line size="24px" />
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet