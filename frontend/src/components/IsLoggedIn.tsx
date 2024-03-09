import { useNavigate } from "react-router-dom";

export const IsLoggedIn = () => {
    const navigate= useNavigate();
    const token = localStorage.getItem('token');
    if (token) return <div className="relative inline-flex items-center justify-center  w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:ring-2 ring-white">
        <div className="font-medium text-gray-600 dark:text-gray-300">AK</div>
    </div>
    else return <div>
        <button onClick={()=> navigate('/')} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2 w-24">Signup</button>
        <button onClick={()=> navigate('/signin')} type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2 w-24">Login</button>
    </div>;
}