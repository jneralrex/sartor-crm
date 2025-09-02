import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';

const LeadDetailsModal = ({ onClose, leadId }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const  token  = useToken();
    const [loading, setLoading] = useState(true);


    const [getSingleLeads, setSingleLeads] = useState({});



    useEffect(() => {
        if (!leadId) return;

        const singleLeads = async () => {
            setLoading(true);
            try {
                const res = await instance.get(`lead/${leadId}`);

                console.log(res);
               setSingleLeads(res.data.data);

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        singleLeads();
    }, [token, leadId]);

 


   

    if (loading) return <DetailsSkeleton />;
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-[455px] h-[95vh] rounded-xl shadow-lg overflow-y-auto hide-scrollbar">
                <div className="flex items-center justify-between px-6 pt-6">
                    <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1A1A1A]">Lead Details</h2>
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
                             <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">

                                Notes From Sales Rep
                                <span className='text-[#484848] mt-2'>
                                   {getSingleLeads?.notes ? getSingleLeads.notes : 'No notes available'}
                                </span>
                            </label>
                             {/* <div className='flex gap-2'>
                                <button className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]" onClick={(e) => {
                                    e.preventDefault();
                                    handleAssignModalToggle();
                                }} >
                                    Visited
                                </button>
                            </div> */}
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
const Select = ({ label, name, value, onChange, options = [] }) => (
  <label className="block text-sm font-medium text-[#1A1A1A]">
    {label}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full h-[48px] bg-[#F5F5F5] rounded-lg px-4 text-sm text-[#484848] outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </label>
);


export default LeadDetailsModal;
