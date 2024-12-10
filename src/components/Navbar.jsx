import React from 'react'

const Navbar = () => {
    return (
        <div className=''>
            {/* logo */}
            <div className=''>
                <img src="/logo.png" alt="logo" className='w-8 h-8' />
                <span>Blog Site</span>
            </div>

            {/* mobile Menu */}
            <div className='md:hidden'></div>

            {/* desktop menu */}
            <div className='hidden md:flex'></div>
        </div>
    )
}

export default Navbar