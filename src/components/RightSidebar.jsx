// import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar"
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const RightSidebar = ({ otherUsers }) => {
  return (
    <div className='w-[25%]'>
      <div className='flex items-center  p-2 bg-gray-100 rounded-full outline-none'>
        <CiSearch size="20px" />
        <input type="text" className='px-2 outline-none bg-transparent' placeholder='search' />
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
        {
          // eslint-disable-next-line react/prop-types
          otherUsers?.map((user) => {
            return (
              <div key={user?._id} className='justify-between items-center flex my-3'>
                <div className='flex '>
                  <div>
                    <Avatar src="https://pe-images.s3.amazonaws.com/photo-editing/cc/crop-image-circle/photoshop-crop-image-to-circle.jpg" size="40" round={true} />


                  </div>
                  <div className='ml-2'>
                    <h1 className='font-bold'>{user?.name}</h1>
                    <p className='text-sm'>{`@${user?.username}`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
                  </Link>
                </div>
              </div>
           )
          })
        }

      </div>
    </div>
  )
}

export default RightSidebar