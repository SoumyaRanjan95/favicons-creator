import React, { useState } from "react";
import { colors,templatestring } from "../store/Constants";


function Logos(){

    const [canvasWidth, setCanvasWidth] = useState('450')
    const [canvasHeight, setCanvasHeight] = useState('90')
    const [canvasBorderRadius, setCanvasBorderRadius] = useState('1')
    const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('#82e0aa');


    const [canvasText, setCanvasText] = useState('Favicons.dev');
    const [canvasTextColor, setCanvasTextColor] = useState('#f4f6f7');
    const [canvasTextFontSize, setCanvasTextFontSize] = useState('30');
    const [canvasTextFontFamily, setCanvasTextFontFamily] = useState('Monospace')
    const [canvasTextFontWeight, setCanvasTextFontWeight] = useState('600');
    const [canvasTextMarginWidth, setCanvasTextMarginWidth] = useState('120')

    const [iconText,setIconText] = useState("Fav");
    const [iconPadding, setIconPadding] = useState("10");
    const [iconMarginWidth, setIconMarginWidth] = useState('10');
    const [iconBorderRadius, setIconBorderRadius] = useState('1px');
    const [iconBackgroundColor, setIconBackgroundColor] = useState("#a569bd");
    const [iconTextColor, setIconTextColor] = useState("#fdfefe");
    const [iconFontSize, setIconFontSize] = useState('30');
    const [iconFontFamily, setIconFontFamily] = useState('Monospace')
    const [iconFontWeight, setIconFontWeight] = useState('600');




    





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

    function handleCanvaSize(e){
        if(e.target.value < 100){
            setCanvasSize(e.target.value);
        }else{
            setCanvasSize(110);
        }
    }


    function drawOnCanvas(){

        const canvas = document.getElementById('img-canvas');
        const ctx = canvas.getContext('2d');


        const iconspan = document.getElementById('icon-span');
        const icontext = document.getElementById('icon-text');

        

        const height = canvasHeight;
        const width = canvasWidth;

        function setCanvas(canvas, w, h) {
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            const scale = 1.0;//window.devicePixelRatio;
            canvas.width = w * scale;
            canvas.height = h * scale;
            ctx.scale(scale, scale);
        }
        
        setCanvas(canvas, width, height); 


        ctx.beginPath();
        ctx.fillStyle = `${canvasBackgroundColor}`
        ctx.roundRect(0,0,parseFloat(width),parseFloat(height),[parseFloat(canvasBorderRadius)])
        ctx.fill();


        ctx.font = `${iconFontWeight} ${iconFontSize}px ${iconFontFamily}`;
        let str = ctx.measureText(iconText)

        console.log(str)
        console.log(str.actualBoundingBoxAscent - str.actualBoundingBoxDescent)

        const heigthscalefactor = 2;

        const iconMarginHeight = (parseFloat(canvasHeight)/2)-(parseFloat(iconPadding)*heigthscalefactor+(str.actualBoundingBoxAscent - str.actualBoundingBoxDescent)+parseFloat(iconPadding)*heigthscalefactor)/2

        if(iconBorderRadius == '50%'){
            ctx.beginPath();
            ctx.fillStyle = iconBackgroundColor;
            const x = parseFloat(iconMarginWidth) + parseFloat(iconPadding) + parseFloat(str.width)/2;
            const y = parseFloat(canvasHeight)/2;
            const radius = parseFloat(iconPadding) + parseFloat(str.width)/2;
            const startangle = 0;
            const endangle = 2*Math.PI;
            ctx.arc(x,y,radius, startangle, endangle)
            //ctx.roundRect(iconMarginWidth, iconMarginHeight,iconPadding+str.width+iconPadding,iconPadding+(str.actualBoundingBoxAscent - str.actualBoundingBoxDescent)+iconPadding,[iconBorderRadius])
            ctx.fill()
            ctx.fillStyle = `${iconTextColor}`
            ctx.fillText(`${iconText}`,parseFloat(iconMarginWidth)+parseFloat(iconPadding),iconMarginHeight+parseFloat(iconPadding)+(str.actualBoundingBoxAscent - str.actualBoundingBoxDescent))
    
        }else{
            const ibr = parseFloat(iconBorderRadius.split('px')[0])
            ctx.beginPath();
            ctx.fillStyle = iconBackgroundColor;
            ctx.roundRect(parseFloat(iconMarginWidth), iconMarginHeight,parseFloat(iconPadding)+str.width+parseFloat(iconPadding),parseFloat(iconPadding)*heigthscalefactor+(str.actualBoundingBoxAscent - str.actualBoundingBoxDescent)+parseFloat(iconPadding)*heigthscalefactor,[ibr])
            ctx.fill()
            ctx.fillStyle = `${iconTextColor}`
            ctx.fillText(`${iconText}`,parseFloat(iconMarginWidth)+parseFloat(iconPadding),iconMarginHeight+parseFloat(iconPadding)*heigthscalefactor+(str.actualBoundingBoxAscent - str.actualBoundingBoxDescent))
    
        }



        
        ctx.font = `${canvasTextFontWeight} ${canvasTextFontSize}px ${canvasTextFontFamily}`;
        let str1 = ctx.measureText(canvasText)

        ctx.fillStyle = `${canvasTextColor}`
        ctx.fillText(`${canvasText}`,parseFloat(canvasTextMarginWidth),(parseFloat(canvasHeight)/2)+(str1.actualBoundingBoxAscent-str1.actualBoundingBoxDescent)/2)



        return canvas


    }

    function handleFileDownload(){
        let canvas = drawOnCanvas()
        canvas.toBlob((blob) =>{

                const fileUrl = window.URL.createObjectURL(blob);
                let linktag = document.createElement('a');
                linktag.href = fileUrl;
                linktag.download = "logo.png";
                linktag.click();
                linktag.remove();


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
                <p className="p-3 text-left text-white text-base font-bold">A Favicons Logos Generator Tool</p>
                <h4 className="max-w-2xl p-3 text-left text-white text-xl font-bold">Want to quickly generate favicons Logos? Try this Logos creator tool 
                    to create awesome logos. 
                </h4>
            </div>
            <div className="p-6 bg-white flex flex-col lg:flex lg:flex-col lg:justify-start">

                <div className="m-5 p-3 flex flex-col lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <div className="flex flex-row justify-between">
                        <p className="p-3 text-2xl font-bold">Create A Simple Logo</p>
                        <div className="flex flex-row">
                            <button onClick={drawOnCanvas} className="border-2 p-3 mx-1 bg-white text-slate-900 border-slate-900 font-bold text-base flex flex-row justify-center items-center rounded-md hover:text-slate-600 hover:border-slate-600"><i className="material-icons text-center px-1">draw</i>Draw</button>
                            <button onClick={handleFileDownload} className="border-2 p-3 mx-1 bg-white text-slate-900 border-slate-900 font-bold text-base flex flex-row justify-center items-center rounded-md hover:text-slate-600 hover:border-slate-600"><i className="material-icons text-center px-1">download</i>Download</button>
                        </div>
                    </div>

                    <div className="m-3 p-3 bg-slate-600 flex flex-row justify-center items-center">
                        <canvas id="img-canvas"></canvas>
                    </div>

                    <div className="m-3 p-3 bg-slate-600 flex flex-row justify-center items-center">
                        <span id='img-span' className=" relative flex flex-row justify-center items-center" style={{'width':`${canvasWidth}px`,'height':`${canvasHeight}px`,'backgroundColor':`${canvasBackgroundColor}`,'borderRadius':`${canvasBorderRadius}px`}}>
                            <span id="icon-span" className="absolute" style={{'left':`${iconMarginWidth}px`, 'padding':`${iconPadding}px`,'backgroundColor':`${iconBackgroundColor}`,'color':`${iconTextColor}`,'fontWeight':`${iconFontWeight}`,'fontFamily':`${iconFontFamily}`,'fontSize':`${iconFontSize}px`,'borderRadius':`${iconBorderRadius}`}}>
                                <div id="icon-text" className="">
                                {iconText}
                                </div>
                            </span>
                            <span id="canvas-span" className="absolute" style={{'left':`${canvasTextMarginWidth}px`,'backgroundColor':`${canvasBackgroundColor}`,'color':`${canvasTextColor}`,'fontWeight':`${canvasTextFontWeight}`,'fontFamily':`${canvasTextFontFamily}`,'fontSize':`${canvasTextFontSize}px`}}>
                                <div id="canvas-text">
                                {canvasText}
                                </div>
                            </span>
                        </span>                    
                    </div>


                    <div className="p-3 text-left text-base font-normal flex flex-col lg:flex lg:flex-row lg:justify-around">


                            <div className="p-2 w-1/3 bg-slate-300">

                                <div>
                                    <p className="p-1 font-bold">Set Canvas Width</p>
                                    <input type="text" value={canvasWidth} onChange={(e) => setCanvasWidth(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                                <div>
                                    <p className="p-1 font-bold">Set Canvas Height</p>
                                    <input type="text" value={canvasHeight} onChange={(e) => setCanvasHeight(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                                <div>
                                    <p className="p-1 font-bold">Canvas Background</p>
                                    <input type="text" value={canvasBackgroundColor} onChange={(e) => setCanvasBackgroundColor(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>

                                <div>
                                    <p className="p-1 font-bold">Border Radius</p>
                                    <input type="text" value={canvasBorderRadius} onChange={(e) => setCanvasBorderRadius(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                                <div>
                                    <p className="p-1 font-bold">Place Icon Text</p>
                                    <input type="range" min='0' max={`${canvasWidth*(1/6)}`} step='1' value={iconMarginWidth} onChange={(e) => setIconMarginWidth(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                                <div>
                                    <p className="p-1 font-bold">Place Canvas Text</p>
                                    <input type="range" min={`${canvasWidth*(1/3)}`} max={`${canvasWidth*(1.5/3)}`} step='1' value={canvasTextMarginWidth} onChange={(e) => setCanvasTextMarginWidth(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                            </div>

                            <div className="p-2 w-1/3 bg-slate-300">
                                <div>
                                    <p className="p-1 font-bold">Icon Text</p>
                                    <input type="text" value={iconText} onChange={(e) => setIconText(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                                <div>
                                    <p className="p-1 font-bold"> Icon Text Color</p>
                                    <input type="text" value={iconTextColor} onChange={(e) => setIconTextColor(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>
                                <div>
                                    <p className="p-1 font-bold"> Icon Text Background Color</p>
                                    <input type="text" value={iconBackgroundColor} onChange={(e) => setIconBackgroundColor(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                                </div>

                                <div>
                                    <p className="p-1 font-bold">Background</p>
                                    <select onClick={(e) => setIconBorderRadius(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                        <option value='1px'>Square</option>
                                        <option value='50%'>Circle</option>
                                        <option value='8px'>Rounded</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="p-1 font-bold">Font Family</p>
                                    <select onClick={(e) => setIconFontFamily(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                        <option value='Monospace'>Monospace</option>
                                        <option value='Tangerine'>Tangerine</option>
                                        <option value='Ariel'>Ariel</option>

                                    </select>
                                </div>

                                <div>
                                    <p className="p-1 font-bold">Icon Font Variant</p>
                                    <select onClick={(e) => setIconFontWeight(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                    <option value='200'>Extra Light</option>
                                    <option value='300'>Light</option>
                                    <option value='400'>Normal</option>
                                    <option value='500'>Medium</option>
                                    <option value='600'>Semi Bold</option>
                                    <option value='700'>Bold</option>
                                    <option value='800'>Extra Bold</option>

                                    </select>
                                </div>

                                <div>
                                    <p className="p-1 font-bold">Icon Font Size</p>
                                    <input type="text" value={iconFontSize} onChange={(e) => setIconFontSize(e.target.value)} className="indent-1 border-2 rounded-md w-4/5  h-8"/>
                                </div>


                            </div>
                        
                            


                        <div className="p-2 w-1/3 bg-cyan-300">

                            <div>
                                <p className="p-1 font-bold">Text</p>
                                <input type="text" value={canvasText} onChange={(e) => setCanvasText(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                            </div>
                            <div>
                                <p className="p-1 font-bold">Text Color</p>
                                <input type="text" value={canvasTextColor} onChange={(e) => setCanvasTextColor(e.target.value)} className="border-2 rounded-md w-4/5 h-8 indent-1"/>
                            </div>


                            <div>
                                    <p className="p-1 font-bold">Font Family</p>
                                    <select onClick={(e) => setCanvasTextFontFamily(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
                                        <option value='Monospace'>Monospace</option>
                                        <option value='Tangerine'>Tangerine</option>
                                        <option value='Ariel'>Ariel</option>

                                    </select>
                                </div>

                            <div>
                                <p className="p-1 font-bold">Font Variant</p>
                                <select onClick={(e) => setCanvasTextFontWeight(e.target.value)} className="border-2 rounded-md w-4/5 h-8">
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
                                <input type="text" value={canvasTextFontSize} onChange={(e) => setCanvasTextFontSize(e.target.value)} className="indent-1 border-2 rounded-md w-4/5  h-8"/>
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


export default Logos;