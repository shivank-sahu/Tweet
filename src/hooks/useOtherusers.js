import { useEffect } from "react";
import { USER_END_POINT_API } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  getOtherUsers } from "../redux/userSlice";

const useOtherusers = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherusers = async () => {
      try {
        const res = await axios.get(`${USER_END_POINT_API}/otheruser/${id}`, {
          withCredentials: true,
        });

        console.log(res);
        dispatch(getOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.log(error);
        return null; // Handle error gracefully, you can return an empty object or any other default value as per your requirement
      }
    };
    fetchOtherusers();
  }, []);
};

export default useOtherusers;
