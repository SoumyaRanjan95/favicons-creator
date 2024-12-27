import React, { useState } from "react";


function Generator(){

    const [textVal,setTextVal] = useState("F");
    const [backgroundColor, setBackgroundColor] = useState("#000000");
    const [backgroundType, setBackgroundType] = useState('0');
    const [fontColor, setFontColor] = useState("#ffffff");
    const [fontVariant, setFontVariant] = useState("400");
    const [fontFamily,setFontFamily] = useState('Monospace');
    const [fontSize,setFontSize] = useState('15');


    const colors = [

        
        "#4c0519",
        "#881337",
        "#9f1239",
        "#be123c",
        "#e11d48",
        "#f43f5e",
        "#fb7185",
        "#fda4af",
        "#fecdd3",
        "#ffe4e6",
        "#fff1f2",

        "#500724",
        "#831843",
        "#9d174d",
        "#be185d",
        "#db2777",
        "#ec4899",
        "#f472b6",
        "#f9a8d4",
        "#fbcfe8",
        "#fce7f3",
        "#fdf2f8",

        "#4a044e",
        "#701a75",
        "#86198f",
        "#a21caf",
        "#c026d3",
        "#d946ef",
        "#e879f9",
        "#f0abfc",
        "#f5d0fe",
        "#fae8ff",
        "#fdf4ff",

        "#3b0764",
        "#581c87",
        "#6b21a8",
        "#7e22ce",
        "#9333ea",
        "#a855f7",
        "#c084fc",
        "#d8b4fe",
        "#e9d5ff",
        "#f3e8ff",
        "#faf5ff",
    ]

    const templatestring = [
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        ];

    const htmlitems = templatestring.map((item,index) => {
        return <li>{item}<br/></li>
    })

    function handleFontChooseColor(e){
        console.log(e.target.style.backgroundColor)
        setFontColor(e.target.style.backgroundColor);
    }

    function handleBackgroundChooseColor(e){
        console.log(e.target.style.backgroundColor)
        setBackgroundColor(e.target.style.backgroundColor);
    }

    const fontcolors = colors.map((item, index) => {
        return <p onClick={handleFontChooseColor} style={{"backgroundColor":`${item}`}} className="h-5 w-5 bg-rose-600"></p>                                

    })

    const backgroundcolors = colors.map((item, index) => {
        return <p onClick={handleBackgroundChooseColor} style={{"backgroundColor":`${item}`}} className=" p-1 h-5 w-5 bg-rose-600"></p>
    })



    return(
        <>
            <div className="p-6 bg-black flex flex-col lg:flex lg:flex-col">
                <p className="p-3 text-left text-white text-base font-bold">A Favicons Generator Tool</p>
                <h4 className="max-w-2xl p-3 text-left text-white text-xl font-bold">Want to quickly generate favicons? Try this generator tool that will build favicons for you
                    using a text font and background color. Simple and easy peazy for a dummy project. 
                </h4>
            </div>
            <div className="p-6 bg-white flex flex-col lg:flex lg:flex-col lg:justify-start">

                <div className="m-5 p-3 flex flex-col lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <div className="flex flex-row justify-between">
                        <p className="p-3 text-2xl font-bold">Generate From Text</p>
                        <button className="border-2 p-3 bg-white text-slate-900 border-slate-900 font-bold text-base flex flex-row justify-center items-center rounded-md hover:text-slate-600 hover:border-slate-600"><i className="material-icons text-center px-1">download</i>Download</button>
                    </div>

                <div>
                    <p className="p-3 text-normal font-bold">Favicons Display</p>
                    <div className="p-3 flex flex-row items-center gap-1">

                    <span style={{'backgroundColor':`${backgroundColor}`,'borderRadius':`${backgroundType}`,'color':`${fontColor}`,'fontWeight':`${fontVariant}`,'fontSize':`11px`,'fontFamily':`${fontFamily}`}} 
                        className="w-4 h-4 flex flex-col justify-center items-center bg-slate-500 text-white">
                            {textVal}
                        </span>  

                        <span style={{'backgroundColor':`${backgroundColor}`,'borderRadius':`${backgroundType}`,'color':`${fontColor}`,'fontWeight':`${fontVariant}`,'fontSize':`18px`,'fontFamily':`${fontFamily}`}} 
                        className="w-8 h-8 flex flex-col justify-center items-center bg-slate-500 text-white">
                            {textVal}
                        </span>  

                        <span style={{'backgroundColor':`${backgroundColor}`,'borderRadius':`${backgroundType}`,'color':`${fontColor}`,'fontWeight':`${fontVariant}`,'fontSize':`${fontSize}px`,'fontFamily':`${fontFamily}`}} 
                        className="w-16 h-16 flex flex-col justify-center items-center bg-slate-500 text-white">
                            {textVal}
                        </span>    

                    </div>
                </div>

                    <div className="p-3 text-left text-base font-normal flex flex-col lg:flex lg:flex-row lg:justify-around">
                        <div className="lg:w-1/3 bg-slate-300 p-3">
                            <div>
                                <p className="p-1 font-bold">Text</p>
                                <input type="text" value={textVal} onChange={(e) => setTextVal(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                            </div>
                            <div>
                                <p className="p-1 font-bold">Background</p>
                                <select onClick={(e) => setBackgroundType(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                    <option value='1px'>Square</option>
                                    <option value='50%'>Circle</option>
                                    <option value='8px'>Rounded</option>
                                </select>
                            </div>
                            <div>
                                <p className="p-1 font-bold">Font Family</p>
                                <select onClick={(e) => setFontFamily(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                    <option value='Monospace'>Monospace</option>
                                    <option value='Tangerine'>Tangerine</option>
                                    <option value='Ariel'>Ariel</option>

                                </select>                             </div>
                            <div>
                                <p className="p-1 font-bold">Font Variant</p>
                                <select onClick={(e) => setFontVariant(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                    <option value='200'>Extra Light</option>
                                    <option value='300'>Light</option>
                                    <option value='400'>Normal</option>
                                    <option value='500'>Medium</option>
                                    <option value='600'>Semi Bold</option>
                                    <option value='700'>Bold</option>
                                    <option value='800'>Extra Bold</option>

                                </select>                            </div>
                            <div>
                                <p className="p-1 font-bold">Font Size</p>
                                <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="border-2 rounded-md w-4/5  h-8"/>
                            </div>
                        </div>
                        <div className="lg:w-1/3 bg-slate-300 p-3">
                            <div>
                                <p className="p-1 font-bold">Font Color</p>
                                <input type="text" className="border-2 rounded-md w-4/5 h-8"/>
                            </div>
                            <div className="my-2 p-1 w-4/5 bg-white grid grid-cols-11 gap-x-px gap-y-px">
                                {fontcolors}
                            </div>
                        </div>
                        <div className="lg:w-1/3 bg-slate-300 p-3">
                            <div>
                                <p className="p-1 font-bold">Background Color</p>
                                <input type="text" className="border-2 rounded-md w-4/5 h-8"/>
                            </div>
                            <div className="my-2 p-1 w-4/5 bg-white grid grid-cols-11 gap-x-px gap-y-px">
                                {backgroundcolors}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="m-5 p-3 flex flex-col text-left lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <p className="p-3 text-2xl font-bold">Usage After Installation</p>
                    <div className="p-3 text-left text-base font-normal">
                        <p className="">Download the files using the download button present above. Then place your files appropriately to start using.</p>
                        <ul className="p-6 list-disc">
                            <li>android-chrome-192x192.png</li>
                            <li>android-chrome-512x512.png</li>
                            <li>apple-touch-icon.png</li>
                            <li>favicon-16x16.png</li>
                            <li>favicon-32x32.png</li>
                            <li>favicon.ico</li>
                        </ul>
                        <p className="">Copy the following tags and paste them to the head of your html.</p>
                        <div className="my-3 bg-slate-100 rounded-md">
                            <ul className="p-3 text-slate-600 select-all">
                                {htmlitems}
                            </ul>
                        </div>
                        <button className="border-2 p-3 bg-sky-600 text-white font-bold text-normal flex flex-row justify-center rounded-md"><i className="material-icons text-center px-1">content_copy</i>Copy</button>

                    </div>

                </div>
            </div>
        </>
    )
}


export default Generator;