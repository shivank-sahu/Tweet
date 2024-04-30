import { useEffect } from "react";
import { TWEET_END_POINT_API } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";

import { getAllTweets } from "../redux/tweetSlice";
import {useSelector} from "react-redux"

const useGetMyTweets = (id) => {
  const {isActive} = useSelector(store=> store.tweet)
    const dispatch = useDispatch();
  const { refresh } = useSelector(store => store.tweet)
  
 const fetchMyTweets = async () => {
   try {
     const res = await axios.get(`${TWEET_END_POINT_API}/alltweets/${id}`, {
       withCredentials: true,
     });

     console.log(res);
     dispatch(getAllTweets(res.data.tweets));
   } catch (error) {
     console.log(error);
     return null; // Handle error gracefully, you can return an empty object or any other default value as per your requirement
   }
  };
  
  
  const followingTweetHandler = async () => {
    
    try {
      
      axios.defaults.withCredentials = true
     
     const res = await axios.get(`${TWEET_END_POINT_API}/followingtweets/${id}`);
      console.log(res);
      dispatch(getAllTweets(res.data.tweets))
    } catch (error) {
      console.log(error);
    }
}
   useEffect(() => {
   
    
     if (isActive) {
     fetchMyTweets()
     }
     else {
       followingTweetHandler()
   }  

 
     
  
   }, [refresh, isActive]);
};

export default useGetMyTweets;
