import React, { useEffect, useState } from "react";



function Darktheme(){




    function setDark(){
        localStorage.setItem("theme","dark");

    }

    function setLight(){
        localStorage.setItem('theme','light')
    }

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches
    const storedTheme = localStorage.getItem('theme')
    console.log(storedTheme)

    const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark)

    if(defaultDark){
        setDark();
    }

    const toggleDarkMode = (e) => {
        console.log("Inside dark mode")
        if(e.target.checked){
            console.log("Dark Applied")
            setDark();
        }else{
            console.log("Light Applied")
            setLight();
        }
    }

    /*
            <i className="material-icons">{`${storedTheme}_mode`}
        <input type="checkbox"
                onChange={toggleDarkMode}
                defaultChecked={defaultDark}/>
        </i>
     */

    return (
        <>

        </>

    )
}

export default Darktheme;