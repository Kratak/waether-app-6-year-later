import React from 'react';
import './App.css';
import useData from "./useData";

const buttonStyles = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

function App() {
    const {recentSearch} = useData();
    return (
        <div>
            <h1>Weather app</h1>
            <div>
                <p>Search for your city</p>
                <input type="text"/>
            </div>
            <div>
                <h2>Recent Search</h2>
                {recentSearch.map(item=> <button className={buttonStyles}>{item}</button>)}
            </div>
        </div>
    );
}

export default App;
