import { useEffect } from "react";
import { USER_END_POINT_API } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_END_POINT_API}/profile/${id}`, {
          withCredentials: true,
        }); 

        console.log(res);
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log(error);
        return null; // Handle error gracefully, you can return an empty object or any other default value as per your requirement
      }
    };
    fetchProfile();
  }, [id]);
};

export default useGetProfile;
