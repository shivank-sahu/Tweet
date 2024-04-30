import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { CiImageOn } from 'react-icons/ci';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TWEET_END_POINT_API } from '../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { getIsActive, getRefresh } from '../redux/tweetSlice';

const CreatePost = () => {
    const { isActive } = useSelector(store => store.tweet);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);

    const foryouHandler = () => {
        dispatch(getIsActive(true));
    };

    const followingHandler = () => {
        dispatch(getIsActive(false));
    };

    const handlePost = async () => {
        try {
            const res = await axios.post(
                `${TWEET_END_POINT_API}/create`,
                { description, id: user?._id },
                { withCredentials: true }
            );

            toast.success(res.data.message);
            console.log(res);
            dispatch(getRefresh());
        } catch (error) {
            console.error('Error posting tweet:', error);
            toast.error('Failed to post tweet. Please try again later.');
        }
        setDescription("");
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-evenly">
                <div onClick={foryouHandler} className={`${isActive ? " border-b-4 border-blue-600" : ""} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className="font-bold text-gray-600 text-lg">For you</h1>
                </div>
                <div onClick={followingHandler} className={`${!isActive ? " border-b-4 border-blue-600" : ""} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className="font-bold text-gray-600 text-lg">Following</h1>
                </div>
            </div>

            <div>
                <div className="flex items-center p-4">
                    <div>
                        <Avatar
                            src="https://pe-images.s3.amazonaws.com/photo-editing/cc/crop-image-circle/photoshop-crop-image-to-circle.jpg"
                            size="40"
                            round={true}
                        />
                    </div>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="ml-2 w-full outline-none border-none text-lg"
                        placeholder="What is happening"
                    />
                </div>
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <div>
                        <CiImageOn />
                    </div>
                    <button
                        className="px-4 py-1 border-none rounded-full bg-[#1D9BF0]"
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
