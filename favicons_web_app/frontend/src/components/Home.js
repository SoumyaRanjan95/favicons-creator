import React from "react";
function Home(){

    return(
        <>
            <div className="p-6 bg-black flex flex-col lg:flex lg:flex-col">
                <p className="p-3 text-left text-white text-base font-bold">A Favicons Builder Website</p>
                <h4 className="p-3 text-left text-white text-xl font-bold">All the necessary tools to create favicons at one place and absolutely FREE </h4>
            </div>
            <div className="p-6 bg-white flex flex-col lg:flex lg:flex-row lg:justify-center">

                <div className="m-5 p-3 flex flex-col lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <p className="p-3 text-lg font-bold">Images</p>
                    <h4 className="p-3 text-left text-base font-normal">
                        You can convert your images into favicons
                    </h4>

                </div>

                <div className="m-5 p-3 flex flex-col lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <p className="p-3 text-lg font-bold">Text</p>
                    <h4 className="p-3 text-left text-base font-normal">
                        You can convert your images into favicons
                    </h4>

                </div>

                <div className=" m-5 p-3 flex flex-col lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <p className="p-3  text-lg font-bold">Emojis</p>
                    <h4 className="p-3 text-left text-base font-normal">
                        You can convert your images into favicons
                    </h4>

                </div>
            </div>
        </>
    )
}

export default Home;