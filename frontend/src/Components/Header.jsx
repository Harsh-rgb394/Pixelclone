import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";



const Header = () => {
    // const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    // const [isModalOpen, setisModalOpen] = useState(false);
    // console.log("current user", user);

    // const handleProfileClick = () => {
    //     setisModalOpen(!isModalOpen);
    // }

    // const handleCloseModal = () => {
    //     setisModalOpen(false);
    // }


    return (
        <div className="w-full flex justify-end items-center  text-sm bg-[#202124] text-white">


            <button
                className="bg-blue-400 text-white px-3 py-2 mt-2 mr-2 rounded hover:bg-blue-600 cursor-pointer"
            >
                Sign In
            </button>

        </div>


    )
}


export default Header;