import React, { useEffect, useState } from "react";
import {Link, Outlet} from 'react-router';


function App(){

    const [openNav,setOpenNav] = useState(false)
    const width = window.innerWidth



    useEffect(()=>{
        window.addEventListener('resize',() => window.innerWidth > 960 && setOpenNav(false))
    },[])



    return(
        <>
        <nav className=" p-6 flex flex-col lg:flex lg:flex-row">
            <div className="flex flex-row justify-between lg:justify-center">
                <a href="/" className="p-3 font-bold">LOGO</a>
                <i onClick={() => setOpenNav(!openNav)} className="material-icons lg:invisible text-slate-600">{openNav?"close":"menu"}</i>
                <button className='shadow-xl rounded-full p-1 bg-white text-center text-base font-bold text-black-600 hover:text-white hover:bg-black transition-all fixed top-0 right-0 flex flex-col justify-center align-center'><i className="material-icons text-center">dark_mode</i></button>

            </div>
            <div className="flex flex-col lg:flex lg:flex-row">
                <a href="/favicon-converter/" className='p-3 bg-white text-base font-bold text-indigo-600 rounded-md mx-3 hover:text-indigo-800 hover:bg-slate-200 transition-all	'>Converter</a>
                <a href="/favicon-generator/" className='p-3 bg-white text-base font-bold text-indigo-600 rounded-md mx-3 hover:text-indigo-800 hover:bg-slate-200 transition-all	'>Generator</a>
                <a href="/logos/" className='p-3 bg-white text-base font-bold text-indigo-600 rounded-md mx-3 hover:text-indigo-800 hover:bg-slate-200 transition-all	'>Logos</a>
                <a href="/emojis/" className='p-3 bg-white text-base font-bold text-indigo-600 rounded-md mx-3 hover:text-indigo-800 hover:bg-slate-200 transition-all	'>Emojis</a>

            </div>
        </nav>
        <Outlet/>
        <footer className=" p-6 flex flex-col lg:flex lg:flex-row">
            <div className="p-6 flex flex-col lg:flex lg:flex-col">
                <p className="my-3 text-base font-bold">Created by</p>
                <h4 className="my-3  text-lg font-bold">Optimistic Tom</h4>
                <p className="my-3 text-base font-bold">About</p>
                <p className="my-3 max-w-72 text-base font-normal">
                    This is my project where I have used Python in the backend to create a awesome free favicons generator.
                    If You like this project feel free to use and recommend to others.
                </p>
            </div>
            <div className="p-6 lg:mx-32 flex flex-col lg:flex lg:flex-row">

                <div className="my-3 flex flex-col lg:flex lg:flex-col">
                    <p className="text-base font-bold">Resources</p>
                    <div className="flex flex-col lg:flex lg:flex-col">
                        <a href="/favicon-converter/" className=' my-2 hover:text-slate-600 text-base font-normal'>Convertor</a>
                        <a href="/favicon-generator/" className=' my-2 hover:text-slate-600 text-base font-normal'>Generator</a>
                        <a href="/logos/" className=' my-2 hover:text-slate-600 text-base font-normal'>Logos</a>
                        <a href="/emojis/" className=' my-2 hover:text-slate-600 text-base font-normal'>Emojis</a>
                    </div>
                </div>

            </div>
        </footer>
    </>
    )
}

export default App