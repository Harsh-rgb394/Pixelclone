import React from "react";

import { Link } from "react-router-dom"

const SubHeaderPage = () => {



    return (

        <>
            <div className="w-full border-b bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        {/* Left Navigation */}
                        <ul className="flex flex-wrap md:flex-nowrap items-center gap-4 text-gray-700 dark:text-gray-200 text-sm">
                            <li>
                                <Link to="#" className="flex items-center space-x-1 font-medium text-blue-600">
                                    <i className="fa fa-search"></i>
                                    <span>All</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="flex items-center space-x-1 hover:text-blue-500">
                                    <i className="fa fa-map-marker"></i>
                                    <span>Maps</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="flex items-center space-x-1 hover:text-blue-500">
                                    <i className="fa fa-newspaper-o"></i>
                                    <span>News</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="flex items-center space-x-1 hover:text-blue-500">
                                    <i className="fa fa-play"></i>
                                    <span>Videos</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="flex items-center space-x-1 hover:text-blue-500">
                                    <i className="fa fa-ellipsis-v"></i>
                                    <span>More</span>
                                </Link>
                            </li>
                        </ul>

                        {/* Right Nav */}

                    </div>
                </div>
            </div>
        </>
    )
}


export default SubHeaderPage;