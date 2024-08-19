import React from 'react';
import './App.css';
import useData from "./useData";



function App() {
    const {recentSearch, handleSetInputValue} = useData();

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center bg-gray-100 p-12 rounded">
                <h1 className="font-bold mb-2">Weather app</h1>
                <div className="mb-6">
                    <p className="pb-2 text-center">Search for your city</p>
                    <input type="search" onChange={handleSetInputValue}/>
                </div>
                <div className="pt-6 pb-6">
                    data
                </div>
                <div>
                    <h2 className="pb-2">Recent Search</h2>
                    {recentSearch.map(item =>
                        <button
                            key={item}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {item}
                        </button>)}
                </div>
            </div>
        </div>
    );
}

export default App;
