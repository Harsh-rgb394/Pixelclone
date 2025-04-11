import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";



const Header = () => {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const [isModalOpen, setisModalOpen] = useState(false);
    console.log("current user", user);

    const handleProfileClick = () => {
        setisModalOpen(!isModalOpen);
    }

    const handleCloseModal = () => {
        setisModalOpen(false);
    }


    return (
        <div className="w-full flex justify-end items-center  text-sm bg-[#202124] text-white">

            {isAuthenticated ? (
                <>
                    {/* Profile Picture Icon */}
                    <img
                        src={user.picture}
                        alt="Profile"
                        onClick={handleProfileClick}
                        className="w-10 h-10 mt-2 mr-2 rounded-full cursor-pointer border"
                    />

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="absolute right-0 mt-40 w-64 bg-white shadow-md rounded-lg p-4 z-50">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={user.picture}
                                    alt="User"
                                    className="w-16 h-16 rounded-full mb-2"
                                />
                                <p className="text-lg font-semibold">{user.name || user.nickname || "User"}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>

                                <button
                                    onClick={() =>
                                        logout({ logoutParams: { returnTo: window.location.origin } })
                                    }
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <button
                    onClick={() => loginWithRedirect()}
                    className="bg-blue-400 text-white px-3 py-2 mt-2 mr-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                    Sign In
                </button>
            )}

        </div>


    )
}


export default Header;