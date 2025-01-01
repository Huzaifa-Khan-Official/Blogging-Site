import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Image from './Image';
import { useAuthStore } from '../store/useAuthStore';
import Modal from './Modal';

const Navbar = () => {
    const { authUser, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/posts?sort=trending", label: "Trending" },
        { to: "/posts?sort=popular", label: "Most Popular" },
        { to: "/about", label: "About" }
    ];

    const closeModal = () => setModalOpen(false);
    const closeUpdateModal = () => setUpdateModalOpen(false);

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between md:border-b-gray-700 md:border-b-2 pt-3 pb-0'>
            {/* logo */}
            <Link className='flex items-center gap-4 text-2xl font-bold ' to="/">
                <Image src="logo.png" alt="logo" w={32} h={32} />
                <span>Blog Site</span>
            </Link>

            {/* mobile Menu */}
            <div className='md:hidden'>
                <div className='cursor-pointer text-2xl' onClick={() => setOpen((prev) => !prev)}>
                    {open ? <ImCross /> : <GiHamburgerMenu />}
                </div>

                <div className={`w-full flex-col gap-2 text-lg font-medium px-4 z-10 absolute top-16 left-0 bg-[#e6e6ff] shadow-2xl ${open ? "flex" : "hidden"} border-t-gray-700 border-t-2 py-3`}>
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
                        <div onClick={() => setModalOpen(!modalOpen)} className='cursor-pointer'>
                            <Image src={authUser.img || "user.png"} alt="profile" w={36} h={36} />
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
                {!authUser ? (
                    <Link to="/login">
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
                    </Link>
                ) : (
                    <div onClick={() => setModalOpen(!modalOpen)} className='cursor-pointer'>
                        <Image src={authUser.img || "user.png"} alt="profile" w={36} h={36} />
                    </div>
                )}
            </div>

            {modalOpen && (
                <Modal
                    authUser={authUser}
                    className="top-64 left-4 w-full md:top-16 md:right-4 xs:w-72"
                    hasOverlay={false} // No overlay
                    onClose={closeModal}
                >
                    <div className='flex items-center gap-4'>
                        <Image src={authUser.img || "user.png"} alt="user-icon" w={48} h={48} className='rounded-full' />
                        <div className='flex flex-wrap'>
                            <p className='font-bold text-lg'>{authUser.username || "User"}</p>
                            <p className='text-sm text-gray-600 break-all'>{authUser.email || "user@example.com"}</p>
                        </div>
                    </div>


                    <div className='mt-4'>
                        <button
                            className='w-full py-2 px-4 bg-blue-600 text-white rounded-3xl'
                            onClick={() => {
                                closeModal();
                                setUpdateModalOpen(true);
                            }}
                        >
                            Update Profile
                        </button>
                    </div>

                    <div className='mt-2 flex justify-end'>
                        <button className='py-2 px-4 rounded-3xl bg-red-600 text-white'
                            onClick={() => {
                                logout();
                                closeModal();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </Modal>
            )}

            {updateModalOpen && (
                <Modal
                    authUser={authUser}
                    className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full xs:w-96"
                    hasOverlay={true} // With overlay
                    onClose={closeUpdateModal}
                >
                    {/* Update Profile Form */}
                    <div className="flex items-center gap-4">
                        <Image
                            src={authUser.img || "user.png"}
                            alt="user-icon"
                            w={48}
                            h={48}
                            className="rounded-full"
                        />
                        <div className="flex flex-wrap">
                            <p className="font-bold text-lg">{authUser.username || "User"}</p>
                            <p className="text-sm text-gray-600 break-all">
                                {authUser.email || "user@example.com"}
                            </p>
                        </div>
                    </div>
                </Modal>
            )}

        </div>
    );
}

export default Navbar;