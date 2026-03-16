import { FaMagnifyingGlass } from "react-icons/fa6";
import React from 'react';

function SearchBar ({title}) {
    return (
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-6 max-w-80">
            <FaMagnifyingGlass />
            <input type="text" placeholder={title} className="w-full bg-transparent border-none focus:outline-none p-2"/>
        </div>
    )
};

export default SearchBar;
