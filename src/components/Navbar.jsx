import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';

const NavLinks = [
    <a href="/">Home</a>,
    <a href="/">Trending</a>,
    <a href="/">Most Popular</a>,
    <a href="/">About</a>,
    <a href="/">
        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
    </a>
]

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between md:border-b-gray-700 md:border-b-2 py-3'>
            {/* logo */}
            <div className='flex items-center gap-4 text-2xl font-bold '>
                <img src="/logo.png" alt="logo" className='w-8 h-8' />
                <span>Blog Site</span>
            </div>

            {/* mobile Menu */}
            <div className='md:hidden'>
                {/* mobile btn */}
                <div className='cursor-pointer text-2xl' onClick={() => setOpen(!open)}>
                    {open ? <ImCross /> : <GiHamburgerMenu />}
                </div>

                {/* mobile link list */}
                <div className={`w-full h-fit flex flex-col gap-2 text-lg font-medium px-4 absolute top-16 bg-[#e6e6ff] transition-all  ease-in-out duration-700 ${open ? "-right-0" : "-right-[100%]"} border-t-gray-700 border-t-2 py-3`}>
                    {
                        NavLinks.map((link, i) => (
                            <div key={i}>
                                {link}
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* desktop menu */}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
                {
                    NavLinks.map((link, i) => (
                        <div key={i}>
                            {link}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Navbar