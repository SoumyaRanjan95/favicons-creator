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

    const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark)

    if(defaultDark){
        setDark();
    }

    const toggleDarkMode = (e) => {
        if(e.target.checked){
            setDark();
        }else{
            setLight();
        }
    }

    return (
        <>

        </>

    )
}

export default Darktheme;