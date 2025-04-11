import React from "react";



const VoiceSearchBox = ({ voiceText, clearVoiceSearch }) => {
    // voiceText={voiceText}
    // clearVoiceSearch={clearVoiceSearch}
    // openVoiceSearch
    // const clearVoiceSearch = () => {
    //     // Function to clear the voice search
    //     console.log("Voice search cleared");
    // }



    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 voice-search">
                <div className="bg-[#202124] rounded-lg shadow-xl w-full max-w-md">
                    <div className="flex justify-between items-center border-b border-gray-600 px-4 py-3">
                        <h5 className="text-lg text-white font-medium">Voice Search</h5>
                        <button
                            className="text-gray-400 hover:text-white text-2xl focus:outline-none"
                            onClick={() => clearVoiceSearch()}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="py-10 px-6 flex flex-col items-center justify-center text-white">
                        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                            <i className="fa fa-microphone text-2xl text-white"></i>
                        </div>
                        <p className="py-2 text-sm">Speak</p>
                        <p className="text-center text-base">{voiceText || ""}</p>
                    </div>
                </div>
            </div>

        </>
    )
}


export default VoiceSearchBox;