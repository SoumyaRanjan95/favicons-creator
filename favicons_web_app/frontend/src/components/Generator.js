import React, { useState } from "react";
import { colors, templatestring } from "../store/Constants";


function Generator(){

    const [textVal,setTextVal] = useState("F");
    const [backgroundColor, setBackgroundColor] = useState("#000000");
    const [backgroundType, setBackgroundType] = useState('0');
    const [fontColor, setFontColor] = useState("#ffffff");
    const [fontVariant, setFontVariant] = useState("400");
    const [fontFamily,setFontFamily] = useState('Monospace');
    const [fontSize,setFontSize] = useState('15');




    const htmlitems = templatestring.map((item,index) => {
        return <li>{item}<br/></li>
    })

    function handleFontChooseColor(e){
        setFontColor(e.target.style.backgroundColor);
    }

    function handleBackgroundChooseColor(e){
        setBackgroundColor(e.target.style.backgroundColor);
    }

    function handleFileDownload(){
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        const display = document.getElementById('favicon-display');

        const width = display.offsetWidth;
        const height = display.offsetHeight;

        let { actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText(textVal);

        const scale = window.devicePixelRatio;

        function setCanvas(canvas, w, h, scale) {
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            canvas.width = w * scale;
            canvas.height = h * scale;
            ctx.scale(scale, scale);
        }
        
        setCanvas(canvas, width, height, scale); 

        if(backgroundType == '12.5%'){
            ctx.fillStyle = backgroundColor;
            
            ctx.beginPath();
            ctx.roundRect(0, 0, width, height, [0.125*width]);
            ctx.fill();

            ctx.fillStyle = fontColor;
            ctx.font = `${fontVariant} ${scale*fontSize}px ${fontFamily}`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(textVal, width / 2, height / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2);
        }else if(backgroundType == "50%"){
            ctx.fillStyle = backgroundColor;
            ctx.beginPath()
            ctx.roundRect(0, 0, width, height, [8]);
            ctx.fill();
            ctx.fillStyle = fontColor;
            ctx.font = `${fontVariant} ${scale*fontSize}px ${fontFamily}`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(textVal, width / 2, height / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2);

        }else{
            ctx.fillStyle = backgroundColor;
            
            ctx.beginPath();
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = fontColor;
            ctx.font = `${fontVariant} ${scale*fontSize}px ${fontFamily}`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(textVal, width / 2, height / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2);
        }


        canvas.toBlob((blob) =>{
            let formData = new FormData();
            formData.append("file",blob)
            fetch('http://localhost:8001/upload-file-generate-from-text/',{
                method: "POST",
                body : formData,

            })
            .then((res) => {
                res.blob().then((blob) => {
                    const fileUrl = window.URL.createObjectURL(blob);
                    let linktag = document.createElement('a');
                    linktag.href = fileUrl;
                    linktag.download = "favicons.zip";
                    linktag.click();
                    linktag.remove();
                })
            })
            .catch(err => console.log(err))

        })


    }


    const fontcolors = colors.map((item, index) => {
        return <div onClick={handleFontChooseColor} style={{"backgroundColor":`${item}`}} className="h-5 w-5"></div>                                

    })

    const backgroundcolors = colors.map((item, index) => {
        return <div onClick={handleBackgroundChooseColor} style={{"backgroundColor":`${item}`}} className="h-5 w-5"></div>
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
                        <button onClick={handleFileDownload} className="border-2 p-3 bg-white text-slate-900 border-slate-900 font-bold text-base flex flex-row justify-center items-center rounded-md hover:text-slate-600 hover:border-slate-600"><i className="material-icons text-center px-1">download</i>Download</button>
                    </div>

                <div>
                    <p className="p-3 text-normal font-bold">Favicons Display</p>
                    <div className="p-3 flex flex-row items-center gap-1">

                        <span id="favicon-display" style={{'backgroundColor':`${backgroundColor}`,'borderRadius':`${backgroundType}`,'color':`${fontColor}`,'fontWeight':`${fontVariant}`,'fontSize':`${fontSize}px`,'fontFamily':`${fontFamily}`,'width':'180px', 'height':'180px'}} 
                        className="flex flex-col justify-center items-center bg-slate-500 text-white">
                            {textVal}
                        </span>   

                        <canvas className="invisible" id="img-canvas"></canvas>

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
                                    <option value='12.5%'>Rounded</option>
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
                                <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="indent-1 border-2 rounded-md w-4/5  h-8"/>
                            </div>
                        </div>
                        <div className="lg:w-1/3 bg-slate-300 p-3">
                            <div>
                                <p className="p-1 font-bold">Font Color</p>
                                <input style={{'backgroundColor':`${fontColor}`}} placeholder={fontColor} type="text" className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                            </div>
                            <div className="my-2 p-1 w-4/5 bg-white grid grid-cols-11 gap-x-px gap-y-px">
                                {fontcolors}
                            </div>
                        </div>
                        <div className="lg:w-1/3 bg-slate-300 p-3">
                            <div>
                                <p className="p-1 font-bold">Background Color</p>
                                <input style={{'backgroundColor':`${backgroundColor}`}} placeholder={backgroundColor} type="text" className="border-2 rounded-md w-4/5 h-8 indent-1"/>
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