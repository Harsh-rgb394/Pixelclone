import React, { use, useState } from "react";
import Header from "../Components/Header";
import VoiceSearchBox from "../Components/VoiceSearchBox";
import { recognition } from "../Api/VoiceSearchAPI";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";


const HomeScree = ({ setSearch, onFocusChange, recentSearch, recentData, preview, setPreview }) => {
    // console.log(recentData)

    const [term, setTerm] = useState("");

    // for voice seeing 
    const [isVoiceSearch, setIsVoiceSearch] = useState(false);
    // for voice search text 
    const [voiceText, setVoiceText] = useState("");

    // for showing image model
    const [imagemodel, setimagemodel] = useState(false);

    // for storing the image 
    // const [image, setimage] = useState('');
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState("");




    const clearTerm = () => {
        setTerm("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // onFocusChange(false)
        if (
            /^[a-zA-Z0-9].*/.test(term) ||
            /^[a-zA-Z0-9]+[" "]/.test(term) ||
            /^[" "]+[a-zA-Z0-9]/.test(term)
        ) {
            setSearch(term.trim());
        }
    };

    const handleSearch = () => {
        // onFocusChange(false)
        if (
            /^[a-zA-Z0-9].*/.test(term) ||
            /^[a-zA-Z0-9]+[" "]/.test(term) ||
            /^[" "]+[a-zA-Z0-9]/.test(term)
        ) {
            setSearch(term.trim());
        }
    };

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
            // setVoiceText(voiceText + transcript);
            // setTerm(voiceText + transcript);
            // setSearch(voiceText + transcript);
            setVoiceText(transcript);
            setTerm(transcript);
            setSearch(transcript);
        };
    }


    const handlefocus = () => {
        onFocusChange(true);
    }

    const handleblur = () => {
        setTimeout(() => onFocusChange(false), 150);
    }


    const handlaction = async () => {
        try {
            if (file) {
                const formdata = new FormData();
                formdata.append('image', file);

                const reponse = await axios.post('http://localhost:5000/api/searchbyimage', formdata, {
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
                const reponse = await axios.post('http://localhost:5000/api/searchbyurl', {
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

    return (
        <>
            {isVoiceSearch && (
                <VoiceSearchBox
                    voiceText={voiceText}
                    clearVoiceSearch={clearVoiceSearch}
                // openVoiceSearch={openVoiceSearch}
                />
            )}

            <Header />

            <div className="flex flex-col items-center justify-center min-h-screen  px-4 bg-[#202124] text-white">
                <img
                    src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                    alt="Google Logo"
                    className="w-[272px] h-[92px] mb-8"

                />

                <div className="w-full max-w-2xl flex items-center border border-[#5f6368] bg-[#303134] rounded-full px-5 py-2 shadow-md focus-within:shadow-lg">
                    {/* <i className="fa fa-search text-gray-400 mr-4"></i> */}
                    <i className="fa fa-search text-white mr-4"></i>
                    <form className="flex-grow" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            name="term"
                            id="term"
                            value={term}
                            onFocus={handlefocus}
                            onBlur={handleblur}
                            onChange={(e) => setTerm(e.target.value)}
                            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                            placeholder="Search Google or type a URL"
                        />
                    </form>

                    {term ? (
                        <i
                            className="fa fa-close text-white cursor-pointer mx-2"
                            onClick={clearTerm}
                        ></i>
                    ) : null}

                    <i
                        className="fa fa-microphone text-blue-400 hover:text-blue-300 cursor-pointer"
                        onClick={openVoiceSearch}
                    ></i>
                    <i
                        className=" 	fa fa-camera text-white  ml-4 cursor-pointer"

                        onClick={() => setimagemodel(true)}
                    ></i>
                </div>

                {/* for image selection and sediing to backend  */}
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

                {/* for recneter serches veiwing  */}
                {recentSearch && recentData.length > 0 && (
                    <div className="w-full max-w-2xl flex flex-col bg-[#303134] border border-[#5f6368] rounded-xl shadow-lg z-10">
                        {recentData.map((item, index) => (
                            <div
                                key={index}
                                className="px-5 py-2 text-white hover:bg-[#3c4043] cursor-pointer rounded-lg

"
                                onMouseDown={() => {
                                    setTerm(item),
                                        setSearch(item)
                                }}
                            >
                                <i className="fa fa-clock-o mr-3 text-gray-400"></i> {item}
                            </div>
                        ))}
                    </div>
                )}


                {/* for buttons viewing or not vewoin  */}
                {!recentSearch && (
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button
                            onClick={handleSearch}
                            className="bg-[#303134] text-white px-4 py-2 rounded-md hover:border hover:border-[#5f6368]"
                        >
                            Google Search
                        </button>
                        <button className="bg-[#303134] text-white px-4 py-2 rounded-md hover:border hover:border-[#5f6368]">
                            I'm Feeling Lucky
                        </button>
                    </div>
                )}

            </div></>


    );
}


export default HomeScree;