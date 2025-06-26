import { useState } from 'react';
import { Pencil, X } from 'lucide-react';

const EditPersonalInfoModal = ({ onClose }) => {
    const [fullName, setFullName] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[99]">
            <div className="bg-white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] md:h-[480px] rounded-xl overflow-y-auto hide-scrollbar relative">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[20px] font-semibold text-[#333843]">Edit Personal Info</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative size-32 rounded-full bg-gray-200">
                        <img
                            src={profileImage || ""}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        <label
                            htmlFor="uploadProfileImage"
                            className="absolute bottom-0 right-0 bg-[#F5F5F5] border border-gray-300 rounded-full p-2 cursor-pointer flex flex-col justify-center"
                        >
                            <Pencil className="text-primary_blue " />
                            <input
                                id="uploadProfileImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>


                <div className='h-full flex flex-col justify-between'>

                    <div className="mb-8">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 outline-none"
                        />
                    </div>

                    <button
                        className=" w-full py-3 bg-primary_blue text-white rounded-md text-sm font-semibold hover:opacity-90 transition"
                    >
                        Confirm Changes
                    </button>
                </div>

            </div>


        </div>
    );
};

export default EditPersonalInfoModal;
