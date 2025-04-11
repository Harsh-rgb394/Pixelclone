import React from "react";



const SearchData = ({ data }) => {


    return (
        <>
            <div className="w-full px-4 sm:px-6 md:px-10 py-4 text-white">
                <p className="text-sm text-gray-400 mb-4">
                    About {data.searchInformation.formattedTotalResults} results (
                    {data.searchInformation.formattedSearchTime} seconds)
                </p>

                {data.items.map((item, index) => (
                    <div key={`${item.link}-${index}`} className="mb-6">
                        {/* Display Link */}
                        {/* display image  */}

                        <a
                            href={`https://${item.displayLink}`}
                            className="text-sm text-[#8ab4f8] hover:underline flex items-center space-x-1"
                            target="_blank"
                            rel="noreferrer">
                            <span>{item.displayLink}</span>
                            <i className="fa fa-angle-down ml-1 text-xs"></i>
                        </a>

                        {/* Title */}
                        <h3 className="text-lg font-medium leading-snug mt-1">
                            <a
                                href={item.formattedUrl}
                                className="text-blue-400 hover:underline"
                                dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
                                target="_blank"
                                rel="noreferrer"
                            />
                        </h3>

                        {item.pagemap?.cse_image?.[0]?.src && (
                            <img
                                src={item.pagemap.cse_image[0].src}
                                alt="preview"
                                className="mt-2 mb-2 rounded-md w-full max-w-md"
                            />
                        )}
                        {/* Snippet */}
                        <p
                            className="text-sm text-gray-400 mt-1"
                            dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
                        />
                    </div>
                ))}
            </div>

        </>
    )
}


export default SearchData;