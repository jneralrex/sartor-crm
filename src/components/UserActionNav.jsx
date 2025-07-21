import { Menu } from '@headlessui/react'
import {
  ChevronDownIcon,

} from '@heroicons/react/16/solid'
import NotificationModal from "./modals/userAction/NotificationModal";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import EditPersonalInfoModal from "./modals/userAction/EditPersonalInfoModal";
import SystemSettingModal from "./modals/userAction/SystemSettingModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


const UserActionNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();



  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSystemSettingModalOpen, setSystemSettingModalOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      setUser(JSON.parse(userData));
    }
  }, []);
  const handleModalToggle = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  const handleEditModalToggle = () => {
    setEditModalOpen((prev) => !prev);
  };
  const handleSystemSettingModalToggle = () => {
    setSystemSettingModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-[300px] md:max-w-[400px] md:gap-2 flex items-center justify-end md:justify-between absolute right-0 top-3 md:top-0 md:relative  ">
      {/* Avatar */}
      <div>
        <img
          src={user.image || ""}
          alt=""
          className="rounded-full size-10 bg-[#D9D9D9] bg-repeat"
        />      </div>

      {/* Menu Dropdown */}
      <div className="relative">
        <Menu as="div" className="relative inline-block text-left z-10">
          <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
            <div className="flex flex-col text-left z-10">
              <span className="text-[14px] font-semibold">{user.name || "User"}</span>
              <span className="text-[12px] text-gray-500">{user.email || ""}</span>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-black/60" />
          </Menu.Button>

          <Menu.Items className="absolute p-4 right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100' : ''
                      } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                    onClick={handleEditModalToggle}
                  >
                    Personal Info
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100' : ''
                      } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                    onClick={handleSystemSettingModalToggle}
                  >
                    System settings
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${active ? 'bg-red-100 text-red-700' : 'text-red-500'} group flex items-center w-full gap-2 px-4 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* Bell with Dot */}
      <div className="flex relative rounded-full h-[30px] w-[30px] text-center bg-[#D9D9D9] justify-center cursor-pointer items-center hidden md:block" onClick={handleModalToggle}>
        <Bell fill="#000068" strokeWidth={0} size={20} className="mt-1 ml-1" />
      </div>
      {/* Modal */}
      {isNotificationModalOpen && <NotificationModal onClose={handleModalToggle} />}
      {isEditModalOpen && <EditPersonalInfoModal onClose={handleEditModalToggle} />}
      {isSystemSettingModalOpen && <SystemSettingModal onClose={handleSystemSettingModalToggle} />}

    </div>
  );
};

export default UserActionNav;
