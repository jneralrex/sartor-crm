import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const LeadDetailsModal = ({ onClose, leadId }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const { token } = useAuth();
    const VITE_API_URL = import.meta.env.VITE_BASE_URL;

    const [getSingleLeads, setSingleLeads] = useState({});


    useEffect(() => {
        if (!leadId) return;

        const singleLeads = async () => {
            try {
                const res = await axios.get(`${VITE_API_URL}lead/${leadId}`, {
                    headers: {
                        's-token': token,
                    },
                });

                console.log(res);
               setSingleLeads(res.data.data);

            } catch (error) {
                console.log(error);
            }
        };

        singleLeads();
    }, [token, leadId]);

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-[455px] h-[95vh] rounded-xl shadow-lg overflow-y-auto hide-scrollbar">
                <div className="flex items-center justify-between px-6 pt-6">
                    <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1A1A1A]">Add A New Lead</h2>
                    <button onClick={onClose}><X /></button>
                </div>

                {/* Tabs */}
                <div className="flex px-6 mt-4">
                    <button
                        className={`pb-2 mr-6 font-medium ${activeTab === 'basic' ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('basic')}
                    >
                        Basic Info
                    </button>
                    <button
                        className={`pb-2 font-medium ${activeTab === 'contact' ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        Contact Person
                    </button>
                </div>

                {/* Form Body */}
                <form className="px-6 py-4 space-y-4">
                    {activeTab === 'basic' && (
                        <>
                            {/* <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Company Name

                                    <span className='text-[#484848] mt-2 w-[150px]'>
                                        Transcorp Ltd
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    ID

                                    <span className='text-[#484848] mt-2'>
                                        SMO2231-12
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Email address

                                    <span className='text-[#484848] mt-2'>
                                        karekal23@gmail.com
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Company State

                                    <span className='text-[#484848] mt-2'>
                                        Lagos, State
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Company Type

                                    <span className='text-[#484848] mt-2'>
                                        Pharmacy Store
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Date Created

                                    <span className='text-[#484848] mt-2'>
                                        12, Feb 2023
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Number Of Stores

                                    <span className='text-[#484848] mt-2'>
                                        24
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Potential Deal size (N)

                                    <span className='text-[#484848] mt-2'>
                                        N120,002,101
                                    </span>
                                </label>


                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Phone No

                                    <span className='text-[#484848] mt-2'>
                                        (232) 232 132
                                    </span>
                                </label>
                                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                    Status

                                    <span className='text-[#484848] mt-2'>
                                        In-progress
                                    </span>
                                </label>
                            </div>
                            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Status
                                <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                                    <Select options={['Status1', 'Status2']} />

                                </div>
                            </label>
                            <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Company Address (Head Office)

                                <span className='text-[#484848] mt-2'>
                                    12, Jakande Street Lagos
                                </span>
                            </label>
                            <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">


                                <span className='text-[#484848] underline mt-2'>
                                    Notes From Sales Rep
                                </span>
                            </label>
                            <div className='flex gap-2'>

                                <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleReAssignModalToggle();
                                    }}
                                >
                                    Update Status
                                </button>
                                <button className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]" onClick={(e) => {
                                    e.preventDefault();
                                    handleAssignModalToggle();
                                }} >
                                    Visited
                                </button>
                            </div> */}
                            <div className="py-4 rounded-md grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">
                                <LabeledItem label="Company Name" value={getSingleLeads?.name} />
                                <LabeledItem label="ID" value={getSingleLeads?.userId} />
                                <LabeledItem label="Email address" value={getSingleLeads?.email} />
                                <LabeledItem label="Company State" value={getSingleLeads?.state} />
                                <LabeledItem label="Company Type" value={getSingleLeads?.type} />
                                <LabeledItem label="Date Created" value={new Date(getSingleLeads?.creationDateTime).toLocaleDateString()} />
                                <LabeledItem label="Number Of Stores" value={getSingleLeads?.stores} />
                                <LabeledItem label="Potential Deal Size (N)" value={getSingleLeads?.dealSize} />
                                <LabeledItem label="Phone No" value={getSingleLeads?.phone} />
                                <LabeledItem label="Status" value={getSingleLeads?.status} />
                            </div>
                            <LabeledItem label="Company Address (Head Office)" value={getSingleLeads?.address} />
                             <div className='flex gap-2'>

                                <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleReAssignModalToggle();
                                    }}
                                >
                                    Update Status
                                </button>
                                <button className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]" onClick={(e) => {
                                    e.preventDefault();
                                    handleAssignModalToggle();
                                }} >
                                    Visited
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === 'contact' && (
                        <>
                            {Array.isArray(getSingleLeads?.contacts) &&
                                getSingleLeads.contacts.map((contact) => (
                                    <div key={contact._id} className="grid grid-cols-1 gap-y-4 mb-6">
                                        <LabeledItem label="Full Name" value={contact.name} />
                                        <LabeledItem label="Email" value={contact.email} />
                                        <LabeledItem label="Phone Number" value={contact.phone} />
                                        <LabeledItem
                                            label="Created At"
                                            value={new Date(contact.creationDateTime).toLocaleDateString()}
                                        />
                                    </div>
                                ))}

                        </>
                    )}
                </form>
            </div>
        </div>
    );
};
  
const LabeledItem = ({ label, value }) => (
  <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
    {label}
    <span className="text-[#484848] mt-2">
      {value !== undefined && value !== null && value !== '' ? value : '---'}
    </span>
  </label>
);



// Reusable Select Component
const Select = ({ label, options = [] }) => (
    <label className="block text-sm font-medium text-[#1A1A1A] w-full">
        {label}
        <select className=' bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'>
            <option>Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx}>{opt}</option>
            ))}
        </select>
    </label>
);


export default LeadDetailsModal;
