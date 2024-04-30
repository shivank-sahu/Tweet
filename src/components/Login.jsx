// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from "axios"
import { USER_END_POINT_API } from '../utils/constant';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice';


const Login = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLogin) {
            try {


                const res = await axios.post(`${USER_END_POINT_API}/login`, { email, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                dispatch(getUser(res?.data?.user))
                if (res.data.success) {


                    toast.success(res.data.message)
                }
                navigate("/")
                console.log(res);
            } catch (error) {
                toast.success(error.response.data.message)
                console.log(error);
            }
        } else {
            try {



                const res = await axios.post(`${USER_END_POINT_API}/register`, { name, username, email, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                if (res.data.success) {
                    toast.success(res.data.message)
                }
                setIsLogin(true)
                console.log(res);
            } catch (error) {
                toast.success(error.response.data.message)
                console.log(error);
            }
        }




    };

    const handleLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <body className="antialiased bg-gradient-to-br from-green-100 to-white">
                <div className="container px-6 mx-auto">
                    <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
                        <div className="flex flex-col w-full">
                            <div>
                                {/* Your SVG here */}
                               
                            </div>
                            <h1 className="text-5xl text-gray-800 font-bold">Client Area</h1>
                            <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
                                Control and monitorize your website data from dashboard.
                            </p>
                        </div>
                        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
                            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                                    {isLogin ? "Signin" : "Signup"}
                                </h2>
                                <form onSubmit={submitHandler} className="w-full">

                                    {
                                        !isLogin && (
                                            <>
                                                <div className="flex flex-col w-full my-5">
                                                    <label className="text-gray-500 mb-2">Name</label>
                                                    <input
                                                        value={name}
                                                        autoComplete='off'
                                                        onChange={(e) => setName(e.target.value)}
                                                        type="text"
                                                        id="name"
                                                        placeholder="Please insert your name"
                                                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                                    />
                                                </div>
                                                <div className="flex flex-col w-full my-5">
                                                    <label className="text-gray-500 mb-2">Username</label>
                                                    <input
                                                        value={username}
                                                        autoComplete='off'
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        type="text"
                                                        id="username"
                                                        placeholder="Please insert your username"
                                                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                                    />
                                                </div>
                                            </>
                                        )
                                    }

                                    <div className="flex flex-col w-full my-5">
                                        <label className="text-gray-500 mb-2">Email</label>
                                        <input
                                            value={email}
                                            autoComplete='off'
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="text"
                                            id="email"
                                            placeholder="Please insert your email"
                                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full my-5">
                                        <label htmlFor="password" className="text-gray-500 mb-2">Password</label>
                                        <input
                                            value={password}
                                            autoComplete='off'
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            id="password"
                                            placeholder="Please insert your password"
                                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full my-5">
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-green-600 rounded-lg text-green-100"
                                        >
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="mr-2">
                                                    {/* Your SVG for the button */}
                                                </div>
                                                <div className="font-bold">{isLogin ? "Signin" : "Signup"}</div>
                                            </div>
                                        </button>
                                        <div className="flex justify-evenly mt-5">
                                            <a href="#" className="w-full text-center font-medium text-gray-500">Recover password!</a>
                                            <button className="w-full text-center font-medium text-gray-500" onClick={handleLogin}>
                                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
};

export default Login;
