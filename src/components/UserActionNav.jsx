// UserActionNav.jsx
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import NotificationModal from "./modals/userAction/NotificationModal";
import EditPersonalInfoModal from "./modals/userAction/EditPersonalInfoModal";
import SystemSettingModal from "./modals/userAction/SystemSettingModal";
import EditUserProfileModal from './EditUserProfileModal';

const UserActionNav = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSystemSettingModalOpen, setSystemSettingModalOpen] = useState(false);
  const [isUserEditModalOpen, setUserEditModalOpen] = useState(false);
  const [userFromStorage, setUserFromStorage] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      setUserFromStorage(JSON.parse(userData));
    }
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser); // ✅ this updates everything automatically
  };


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-[300px] md:max-w-[400px] md:gap-2 flex items-center justify-end absolute right-0 top-3 md:top-0 md:relative">
      <div>
        <img
          src={userFromStorage.image || ""}
          alt="User"
          className="rounded-full size-10 bg-[#D9D9D9] object-cover"
        />
      </div>

      <Menu as="div" className="relative inline-block text-left z-10">
        <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
          <div className="flex flex-col text-left">
            <span className="text-[14px] font-semibold">{userFromStorage.fullName || "User"}</span>
            <span className="text-[12px] text-gray-500">{userFromStorage.email || ""}</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-black/60" />
        </Menu.Button>

        <Menu.Items className="absolute p-4 right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full px-4 py-2 text-sm`}
                  onClick={() => setEditModalOpen(true)}
                >
                  Personal Info
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full px-4 py-2 text-sm`}
                  onClick={() => setSystemSettingModalOpen(true)}
                >
                  System Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full px-4 py-2 text-sm`}
                  onClick={() => setUserEditModalOpen(true)}
                >
                  Edit Your Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${active ? 'bg-red-100 text-red-700' : 'text-red-500'} group flex items-center w-full px-4 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>

      <div
        className="hidden md:flex relative rounded-full h-[30px] w-[30px] bg-[#D9D9D9] justify-center items-center cursor-pointer ml-2"
        onClick={() => setNotificationModalOpen(true)}
      >
        <Bell fill="#000068" strokeWidth={0} size={20} className="mt-1 ml-1" />
      </div>

      {isNotificationModalOpen && (
        <NotificationModal onClose={() => setNotificationModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditPersonalInfoModal onClose={() => setEditModalOpen(false)} />
      )}
      {isSystemSettingModalOpen && (
        <SystemSettingModal onClose={() => setSystemSettingModalOpen(false)} />
      )}
       {isUserEditModalOpen && (
        <EditUserProfileModal
          onClose={() => setUserEditModalOpen(false)}
          userData={user}
          onUserUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default UserActionNav;
