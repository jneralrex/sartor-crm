import { Plus, X, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

const paymentTerms = [
    "Payment On Delivery",
    "⁠Full Payment after 70% stock sold",
    "⁠Payment 2 weeks after delivery",
    "Sales Or Returns"
];

const CreateLpoModal = ({ onClose, onSuccess }) => {
    const  token  = useToken();

    const [leads, setLeads] = useState([]);
    const [productsList, setProductsList] = useState([]);

    const [leadId, setLeadId] = useState('');
    const [terms, setTerms] = useState('');
    const [products, setProducts] = useState([{ product: '', quantity: '' }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);


    // Fetch leads and products once
    useEffect(() => {
        const fetchData = async () => {
            try {
                const leadRes = await instance.get("leads?page=1&limit=100");
                setLeads(leadRes.data.data.leads || []);

                const prodRes = await instance.get("products?limit=all");
                setProductsList(prodRes.data.data.data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token]);

    // Update total
    useEffect(() => {
        let total = 0;
        products.forEach(({ product, quantity }) => {
            const item = productsList.find(p => p._id === product);
            if (item && quantity) {
                total += item.price * Number(quantity);
            }
        });
        setTotalAmount(total);
    }, [products, productsList]);

    const handleChange = (index, field, value) => {
        const updated = [...products];
        updated[index][field] = value;
        setProducts(updated);
    };

    const addProduct = () => {
        setProducts(prev => [...prev, { product: '', quantity: '' }]);
    };

    const removeProduct = (index) => {
        const updated = [...products];
        updated.splice(index, 1);
        setProducts(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            lead: leadId,
            terms,
            product: products.map(p => ({
                product: p.product,
                quantity: Number(p.quantity),
            })),
        };

        setLoading(true);
        try {
            const res = await instance.post("lpo", payload);

            console.log(res)
            onSuccess();
            onClose(); 
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message)
        }
        finally {
            setLoading(false);
        }
    };
console.log("products",productsList)
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Create An LPO</h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>

                    {/* Lead Selection */}
                    <label className='font-medium text-[14px] text-[#1A1A1A]'>
                        Select Lead Name
                        <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                            <select
                                value={leadId}
                                onChange={e => setLeadId(e.target.value)}
                                className="bg-transparent outline-none w-full text-sm"
                            >
                                <option value="">Select lead</option>
                                {leads.map(lead => (
                                    <option key={lead._id} value={lead._id}>
                                        {lead.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>

                    {/* Terms Selection */}
                    <label className='font-medium text-[14px] text-[#1A1A1A]'>
                        Select Payment Terms
                        <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                            <select
                                value={terms}
                                onChange={e => setTerms(e.target.value)}
                                className="bg-transparent outline-none w-full text-sm"
                            >
                                <option value="">Select terms</option>
                                {paymentTerms.map(term => (
                                    <option key={term}>{term}</option>
                                ))}
                            </select>
                        </div>
                    </label>

                    {/* Products Loop */}
                    {products.map((prod, idx) => (
                        <div key={idx} className="border rounded-lg p-3">
                            <label className='font-medium text-[14px] text-[#1A1A1A]'>
                                Select Product
                                <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                                    <select
                                        value={prod.product}
                                        onChange={(e) => handleChange(idx, "product", e.target.value)}
                                        className="bg-transparent outline-none w-full text-sm"
                                    >
                                        <option value="">Select product</option>
                                        {productsList.map(item => (
                                            <option key={item._id} value={item._id}>
                                                {item.productName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </label>

                            <label className='font-medium text-[14px] text-[#1A1A1A] mt-3 block'>
                                QTY
                                <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                    <input
                                        type="number"
                                        placeholder='Quantity of Product'
                                        className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full'
                                        value={prod.quantity}
                                        onChange={(e) => handleChange(idx, "quantity", e.target.value)}
                                    />
                                </div>
                            </label>

                            {/* Remove */}
                            {products.length > 1 && (
                                <button
                                    type="button"
                                    className="mt-2 text-red-500 flex items-center gap-1 text-sm"
                                    onClick={() => removeProduct(idx)}
                                >
                                    <Trash2 size={14} /> Remove
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add Product */}
                    <div className='flex justify-between items-center'>
                        <button
                            type="button"
                            onClick={addProduct}
                            className='flex gap-2 text-[#484848] text-[16px] font-medium'
                        >
                            <Plus size={18} /> <span>Add Product</span>
                        </button>
                        {/* <span className='text-[#484848] text-[16px] font-medium'>Total Amount</span> */}
                    </div>

                    {/* <span className='w-full text-end text-[#1A1A1A] text-[20px] font-semibold'>
                        ₦{totalAmount.toLocaleString()}
                    </span> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Creating LPO...
                            </>
                        ) : (
                            'Create LPO'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLpoModal;
