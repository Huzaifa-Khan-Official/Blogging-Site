import { IKImage } from 'imagekitio-react';
import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import Image from './Image';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';


const NavLinks = [
    <Link to="/">Home</Link>,
    <Link to="/">Trending</Link>,
    <Link to="/">Most Popular</Link>,
    <Link to="/">About</Link>,
    <SignedOut>
        <Link to="/login">
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
        </Link>
    </SignedOut>,
    <SignedIn>
        <UserButton />
    </SignedIn>
]

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between md:border-b-gray-700 md:border-b-2 py-3'>
            {/* logo */}
            <div className='flex items-center gap-4 text-2xl font-bold '>
                <Image src="logo.png" alt="logo" w={32} h={32} />
                <span>Blog Site</span>
            </div>

            {/* mobile Menu */}
            <div className='md:hidden'>
                {/* mobile btn */}
                <div className='cursor-pointer text-2xl' onClick={() => setOpen((prev) => !prev)}>
                    {open ? <ImCross /> : <GiHamburgerMenu />}
                </div>

                {/* mobile link list */}
                <div className={`w-full h-fit flex-col gap-2 text-lg font-medium px-4 z-10 absolute top-16 bg-[#e6e6ff] shadow-2xl transition-all  ease-in-out duration-[5000] ${open ? "flex" : "hidden"}  ${open ? "-right-0" : "-right-[100%]"}  border-t-gray-700 border-t-2 py-3`}>
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
        </div >
    )
}

export default Navbar