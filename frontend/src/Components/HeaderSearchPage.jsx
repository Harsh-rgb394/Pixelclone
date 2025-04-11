import React, { useState, useEffect } from "react";
import VoiceSearchBox from "./VoiceSearchBox";
import { Link } from "react-router-dom"
import { recognition } from "../Api/VoiceSearchAPI";
import { getCroppedImg } from "../Api/Solver"
import Cropper from "react-easy-crop"
import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";


const HeaderSearchPage = ({ searchTerm, setSearch, recentData, onFocusChange, recentSearch, preview,
    setPreview }) => {

    // const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    // const [isModalOpen, setisModalOpen] = useState(false);
    // console.log("current user", user);

    // const handleProfileClick = () => {
    //     setisModalOpen(!isModalOpen);
    // }

    // const handleCloseModal = () => {
    //     setisModalOpen(false);
    // }

    //setTearm
    const [term, setTerm] = useState('');

    //voice search
    const [isVoiceSearch, setIsVoiceSearch] = useState(false);
    //voice text
    const [voiceText, setVoiceText] = useState('');
    // for showing image model
    const [imagemodel, setimagemodel] = useState(false);

    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState("");
    // const [preview, setPreview] = useState(null);

    // image modify model 
    const [showCropModal, setShowCropModal] = useState(false);


    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    //set term
    useEffect(() => {
        setTerm(searchTerm);
        // eslint-disable-next-line
    }, []);

    // clear voice search
    const clearVoiceSearch = () => {
        setIsVoiceSearch(false);
        // recognition.stop();
    };
    // open voice search
    const openVoiceSearch = () => {
        setIsVoiceSearch(true);
        recognition.start();
        recognition.onresult = (event) => {
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            // console.log(voiceText, transcript);
            setVoiceText(transcript);
            setTerm(transcript);
            setSearch(transcript);
            setIsVoiceSearch(false);
        };
    };

    //clear term
    const clearTerm = () => {
        setTerm('');
    };

    //   handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    //   handle search
    const handleSearch = () => {
        if (
            searchTerm !== term.trim() &&
            (/^[a-zA-Z0-9].*/.test(term.trim()) ||
                /^[a-zA-Z0-9]+[" "]/.test(term.trim()) ||
                /^[" "]+[a-zA-Z0-9]/.test(term.trim()))
        ) {
            setSearch(term.trim());
        }
    };

    const handlefocus = () => {
        onFocusChange(true);
    }

    const handleblur = () => {
        setTimeout(() => onFocusChange(false), 150);
    }

    // const handleimage = () => {

    // }
    const handlaction = async () => {
        try {
            if (file) {
                const formdata = new FormData();
                formdata.append('image', file);

                const reponse = await axios.post('https://pixelclone.onrender.com/api/searchbyimage', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // console.log(reponse.data);
                // alert("its done");
                console.log(reponse.data.info);
                if (reponse.data.success) {
                    setimagemodel(false);
                    setTerm(reponse.data.info);
                    setSearch(reponse.data.info);
                    // setimagemodel(false);

                }
            }
            else if (imageURL) {
                const reponse = await axios.post('https://pixelclone.onrender.com/api/searchbyurl', {
                    imageurl: imageURL,
                });

                // console.log(response.data);
                // alert("its done");
                console.log(reponse.data.info);
                if (reponse.data.success) {
                    setimagemodel(false);
                    setTerm(reponse.data.info);
                    setSearch(reponse.data.info);
                    // setimagemodel(false);

                }

            }
            else {
                alert("Please select an image or enter a URL.");
            }

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    const cropandsearch = async () => {
        const croppedImage = await getCroppedImg(preview, croppedAreaPixels);
        setPreview(croppedImage); // update preview
        setShowCropModal(false);
        // console.log(preview);


        await imagebackend();
    }

    const imagebackend = async () => {
        try {
            const response = await axios.post("https://pixelclone.onrender.com/api/searchbybase", {
                base64: preview.split(",")[1]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data.info);
            if (response.data.success) {
                setTerm(response.data.info);
                setSearch(response.data.info);
                setShowCropModal(false);

            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {isVoiceSearch && (
                <VoiceSearchBox
                    voiceText={term}
                    clearVoiceSearch={clearVoiceSearch}
                />
            )}

            <div className="w-full border-b bg-gray-900 text-white px-4 sm:px-6">
                <nav className="flex flex-col md:flex-row items-center justify-between py-3 space-y-4 md:space-y-0">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                            alt="Google Logo"
                            className="h-10 sm:h-12"
                        />
                    </Link>

                    {/* Search Box & Recent Search */}
                    <div className="w-200 relative flex w-full md:w-1/2">
                        <div className="flex w-full bg-gray-800 border border-gray-600 rounded-full items-center px-4 py-2">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Uploaded"
                                    className="w-10 h-10 mr-4  object-cover rounded cursor-pointer"
                                    onClick={() => setShowCropModal(true)}
                                />
                            )}

                            <form className="flex-grow" onSubmit={(e) => handleSubmit(e)}>
                                <input
                                    type="text"
                                    name="term"
                                    id="term"
                                    value={term}
                                    onFocus={handlefocus}
                                    onBlur={handleblur}
                                    onChange={(e) => setTerm(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                                />
                            </form>
                            {/* image crop model  */}
                            {showCropModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                                    <div className="bg-white p-4 rounded shadow-lg w-[90vw] h-[90vh] relative">
                                        <Cropper
                                            image={preview}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={4 / 3}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={(_, croppedAreaPixels) =>
                                                setCroppedAreaPixels(croppedAreaPixels)
                                            }
                                        />

                                        {/* Buttons */}
                                        <div className="flex justify-end mt-4 space-x-2 absolute bottom-5 right-5">
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                                onClick={cropandsearch}
                                            >
                                                Crop
                                            </button>
                                            <button
                                                className="bg-green-600 text-white px-4 py-2 rounded"
                                                onClick={() => setShowCropModal(false)}
                                            >
                                                Use Full Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}



                            {term && (
                                <i
                                    className="fa fa-close text-gray-400 hover:text-white cursor-pointer mx-2"
                                    onClick={() => clearTerm()}
                                ></i>
                            )}
                            <i
                                className="fa fa-microphone text-[#8ab4f8] hover:text-white cursor-pointer mx-2"
                                onClick={() => openVoiceSearch()}
                            ></i>
                            {/* <i
                                className="fa fa-search text-gray-400 hover:text-white cursor-pointer mx-2"
                                onClick={() => handleSearch()}
                            ></i> */}
                            <i
                                className=" 	fa fa-camera text-white  ml-4 cursor-pointer"

                                onClick={() => setimagemodel(true)}
                            ></i>
                        </div>

                        {imagemodel && (
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
                                <div className="bg-[#202124] p-6 rounded-xl w-full max-w-md relative">
                                    <button
                                        className="absolute top-2 right-2 text-white text-xl cursor-pointer"
                                        onClick={() => {
                                            setimagemodel(false);
                                            setFile(null);
                                            setImageURL("");
                                            setPreview(null);
                                        }}
                                    >
                                        ✕
                                    </button>

                                    <h2 className="text-white text-xl mb-4">Search by Image</h2>

                                    <div className="space-y-4">
                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-white mb-1">Upload Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const uploaded = e.target.files[0];
                                                    setFile(uploaded);
                                                    setImageURL("");
                                                    setPreview(URL.createObjectURL(uploaded));
                                                }}
                                                className="w-full bg-[#303134] text-white p-2 rounded"
                                            />
                                        </div>

                                        {/* OR */}
                                        <div className="text-center text-gray-400">OR</div>

                                        {/* Image URL Input */}
                                        <div>
                                            <label className="block text-white mb-1">Paste Image URL</label>
                                            <input
                                                type="text"
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full bg-[#303134] text-white p-2 rounded"
                                                value={imageURL}
                                                onChange={(e) => {
                                                    setImageURL(e.target.value);
                                                    setFile(null);
                                                    setPreview(e.target.value);
                                                }}
                                            />
                                        </div>

                                        {/* Preview Image */}
                                        {preview && (
                                            <div className="mt-4 text-center">
                                                <p className="text-gray-300 mb-2">Preview:</p>
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="mx-auto max-h-48 rounded-md"
                                                />
                                            </div>
                                        )}
                                        <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500" onClick={handlaction}>
                                            Search it
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )}


                    </div>

                    {/* Right Menu Icons */}
                    {/* for profile and login and logout  */}

                </nav>
            </div>


        </>
    )
}


export default HeaderSearchPage;