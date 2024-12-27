import React from "react";
function Converter(){


    function dragOverHandler(e){
        console.log("Files in the drop zone...")
        e.preventDefault();
    }

    function handleDropEvent(e){
        e.preventDefault();
        console.log("Files dropped")

        if(e.dataTransfer.items){
            [...e.dataTransfer.items].forEach((item,i) => {
                if(item.kind === 'file'){
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);

                }
            })
        }else{
            [...e.dataTransfer.files].forEach((file,i) =>{
                console.log(`… file[${i}].name = ${file.name}`);

            })
        }

    }


    async function showFilePicker() {
        let fileHandle;
        const pickerOptions = {
            types:[
                {
                    description: "Images",
                    accept: {
                        "image/*": [".png",".jpg",".jpeg"],
                    }
                }
            ],
            excludeAcceptAllOptions: true,
            multiple: false,
        };
        [fileHandle] = await window.showOpenFilePicker(pickerOptions);
        console.log(fileHandle.name)
    }


    const templatestring = [
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
        ];

    const items = templatestring.map((item,index) => {
        return <li>{item}<br/></li>
    })

    return(
        <>
            <div className="p-6 bg-black flex flex-col lg:flex lg:flex-col">
                <p className="p-3 text-left text-white text-base font-bold">A Favicons Converter Tool</p>
                <h4 className="max-w-2xl p-3 text-left text-white text-xl font-bold">Want to quickly convert favicons from an image? Just upload the image here in the drag and
                drop feature and the tool will convert every thing for you.    
                </h4>
            </div>
            <div className="p-6 bg-white flex flex-col lg:flex lg:flex-col lg:justify-center">

                <div className="m-5 p-3 flex flex-col lg:flex lg:flex-col border border-ouline rounded-md shadow-md">
                    <p className="p-3 text-2xl font-bold">Converter</p>
                    <div className="p-3 text-left text-base font-normal">
                        <div onClick={showFilePicker} onDrop={handleDropEvent} onDragOver={dragOverHandler} className="border-2 p-10 text-center rounded-md">Drag and drop your file here or click to upload</div>
                        <button className="border-2 p-3 bg-sky-600 text-white font-bold text-base flex flex-row justify-center rounded-md"><i className="material-icons text-center px-1">download</i>Download</button>
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
                                {items}
                            </ul>
                        </div>
                        <button className="border-2 p-3 bg-sky-600 text-white font-bold text-normal flex flex-row justify-center rounded-md"><i className="material-icons text-center px-1">content_copy</i>Copy</button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Converter;