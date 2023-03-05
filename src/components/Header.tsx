import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <div className="p-4 bg-theme1Color1 text-white">
                <div className="flex items-center justify-end gap-5 font-bold">
                    <NavLink className={({isActive}) => `p-2 hover:bg-gray-600 hover:bg-opacity-50 ${isActive && 'border-b-2'}`} to="/">Characters</NavLink>
                    <NavLink className={({isActive}) => `p-2 hover:bg-gray-600 hover:bg-opacity-50 ${isActive && 'border-b-2'}`} to="/episode">Episodes</NavLink>
                    <NavLink className={({isActive}) => `p-2 hover:bg-gray-600 hover:bg-opacity-50 ${isActive && 'border-b-2'}`} to="/location">Locations</NavLink>
                </div>

            </div>
        </header>
    )
}

