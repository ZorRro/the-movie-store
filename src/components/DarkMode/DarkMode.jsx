import React from "react";

import "./DarkMode.css";
import Sun from "../../assets/Sun.svg?react";
import Moon from "../../assets/Moon.svg?react";

const DarkMode = () => {

    const setDarkTheme = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }
    const setLightTheme = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
    }

    const toggleTheme = (e) => {
        e.target.checked ? setDarkTheme() : setLightTheme(); 
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onClick={toggleTheme}
                defaultChecked={true}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
