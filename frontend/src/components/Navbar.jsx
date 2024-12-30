import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react';
import Image from './Image';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { authUser, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const { isSignedIn } = useAuth();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/posts?sort=trending", label: "Trending" },
        { to: "/posts?sort=popular", label: "Most Popular" },
        { to: "/about", label: "About" }
    ];

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between md:border-b-gray-700 md:border-b-2 py-3'>
            {/* logo */}
            <Link className='flex items-center gap-4 text-2xl font-bold ' to="/">
                <Image src="logo.png" alt="logo" w={32} h={32} />
                <span>Blog Site</span>
            </Link>

            {/* mobile Menu */}
            <div className='md:hidden'>
                {/* mobile toggle button */}
                <div className='cursor-pointer text-2xl' onClick={() => setOpen((prev) => !prev)}>
                    {open ? <ImCross /> : <GiHamburgerMenu />}
                </div>

                {/* mobile links */}
                <div className={`w-full h-fit flex-col gap-2 text-lg font-medium px-4 z-10 absolute top-16 bg-[#e6e6ff] shadow-2xl transition-all ease-in-out duration-[5000] ${open ? "flex" : "hidden"} ${open ? "-right-0" : "-right-[100%]"} border-t-gray-700 border-t-2 py-3`}>
                    {navLinks.map((link, index) => (
                        <div key={index}>
                            <Link to={link.to}>{link.label}</Link>
                        </div>
                    ))}
                    {!authUser ? (
                        <Link to="/login">
                            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
                        </Link>
                    ) : (
                        <div>
                            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white' onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* desktop Menu */}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
                {navLinks.map((link, index) => (
                    <div key={index}>
                        <Link to={link.to}>{link.label}</Link>
                    </div>
                ))}
                {!authUser && (
                    <Link to="/login">
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
                    </Link>
                )}
                {authUser && (
                    <div>
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white' onClick={logout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
