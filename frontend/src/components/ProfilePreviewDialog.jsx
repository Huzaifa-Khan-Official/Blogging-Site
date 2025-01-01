import React from 'react';
import Image from './Image';

export function ProfilePreviewDialog({ isOpen, onClose, user, onUpdateProfile, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="z-20 bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-4 p-2">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={user.img || "user.png"} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{user.username}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <button
              onClick={onUpdateProfile}
              className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Update Profile
            </button>
            <button
              onClick={onLogout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-10" onClick={onClose} />
    </div>
  );
}