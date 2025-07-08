// import { Plus, X } from 'lucide-react'

// const CreateLpoModal = ({ onClose }) => {

//     return (
//         <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
//             <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
//                 <div className='flex items-center justify-between'>
//                     <div>
//                         <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Create An LPO</h2>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className=""
//                     >
//                         <X />
//                     </button>
//                 </div>
//                 <div>

//                     <form action="" className='flex flex-col gap-5 mt-5'>

//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Lead Name
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
//                                 <Select options={['lead1', 'lead2']} />

//                             </div>
//                         </label>


//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Product
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
//                                 <Select options={['Med1', 'Med2']} />

//                             </div>
//                         </label>

//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Payment Terms
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
//                                 <Select options={['On-Delivery', 'Pre-Delivery']} />

//                             </div>
//                         </label>

//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>QTY
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
//                                 <input type="text" placeholder='Quantity of Product' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
//                             </div>
//                         </label>

//                         <div className='flex justify-between items-center'>
//                             <div className='flex gap-2 text-[#484848] text-[16px] font-medium'>
//                                 <span><Plus /></span> <span>Add Product</span>
//                             </div>
//                             <span className='text-[#484848] text-[16px] font-medium'>Total Amount</span>

//                         </div>
//                         <span className='w-full text-end text-[#1A1A1A] text-[20px] font-semibold'>
//                             NGN, 100,0000,000
//                         </span>
//                         <button className='bg-primary_blue  text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]' onClick={onClose} >
//                             Create LPO
//                         </button>
//                     </form>
//                 </div>
//             </div>
//             {/* Modal */}
//         </div>
//     )
// }
// const Select = ({ label, options = [] }) => (
//     <label className="block text-sm font-medium text-[#1A1A1A] w-full">
//         {label}
//         <select className=' bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'>
//             <option>Select {label}</option>
//             {options.map((opt, idx) => (
//                 <option key={idx}>{opt}</option>
//             ))}
//         </select>
//     </label>
// );
// export default CreateLpoModal

// import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import axios from "axios";
// import { useAuth } from "../../../context/AuthContext";

// const paymentTerms = [
//   "Payment On Delivery",
//   "⁠Full Payment after 70% stock sold",
//   "⁠Payment 2 weeks after delivery"
// ];

// const CreateLpoModal = ({ onClose }) => {
//   const { token } = useAuth();
//   const VITE_API_URL = import.meta.env.VITE_BASE_URL;

//   const [leadId, setLeadId] = useState("");
//   const [terms, setTerms] = useState("");
//   const [products, setProducts] = useState([{ product: "", quantity: "" }]);

//   const [leads, setLeads] = useState([]);
//   const [stockProducts, setStockProducts] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // Fetch leads and available products
//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const leadRes = await axios.get(`${VITE_API_URL}leads`, {
//           headers: { "s-token": token }
//         });
//         setLeads(leadRes.data.data);

//         const prodRes = await axios.get(`${VITE_API_URL}products`, {
//           headers: { "s-token": token }
//         });
//         setStockProducts(prodRes.data.data);
//       } catch (err) {
//         console.error("Error fetching dropdown data", err);
//       }
//     };

//     fetchDropdownData();
//   }, [token]);

//   // Recalculate total amount
//   useEffect(() => {
//     let total = 0;
//     products.forEach(({ product, quantity }) => {
//       const found = stockProducts.find(p => p._id === product);
//       if (found && quantity) {
//         total += found.price * Number(quantity);
//       }
//     });
//     setTotalAmount(total);
//   }, [products, stockProducts]);

//   const handleProductChange = (index, field, value) => {
//     const updated = [...products];
//     updated[index][field] = value;
//     setProducts(updated);
//   };

//   const addProduct = () => {
//     setProducts(prev => [...prev, { product: "", quantity: "" }]);
//   };

//   const removeProduct = (index) => {
//     const updated = [...products];
//     updated.splice(index, 1);
//     setProducts(updated);
//   };

//   const handleSubmit = async () => {
//     if (!leadId || !terms || products.length === 0) return;

//     try {
//       const payload = {
//         lead: leadId,
//         terms,
//         product: products.map(p => ({
//           product: p.product,
//           quantity: Number(p.quantity)
//         }))
//       };

//       const res = await axios.post(`${VITE_API_URL}lpo`, payload, {
//         headers: { "s-token": token }
//       });

//       console.log("LPO created:", res.data);
//       onClose(); // close modal on success
//     } catch (error) {
//       console.error("Error creating LPO", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center">
//       <div className="bg-white p-6 w-[90%] max-w-[500px] rounded-xl shadow-lg max-h-[95vh] overflow-y-auto hide-scrollbar">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold">Create An LPO</h2>
//           <button onClick={onClose}>
//             <X className="text-gray-500 hover:text-black" />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {/* Select Lead */}
//           <div>
//             <label className="text-sm text-gray-500">Select Lead Name</label>
//             <select
//               className="mt-1 w-full border px-3 py-2 rounded-md text-sm"
//               value={leadId}
//               onChange={e => setLeadId(e.target.value)}
//             >
//               <option value="">-- Select Lead --</option>
//               {leads.map(lead => (
//                 <option key={lead._id} value={lead._id}>
//                   {lead.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Select Terms */}
//           <div>
//             <label className="text-sm text-gray-500">Select Payment Terms</label>
//             <select
//               className="mt-1 w-full border px-3 py-2 rounded-md text-sm"
//               value={terms}
//               onChange={e => setTerms(e.target.value)}
//             >
//               <option value="">-- Select Terms --</option>
//               {paymentTerms.map(term => (
//                 <option key={term} value={term}>
//                   {term}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Product Blocks */}
//           {products.map((item, index) => (
//             <div key={index} className="border p-3 rounded-md">
//               <div className="flex items-center justify-between gap-2">
//                 {/* Select Product */}
//                 <select
//                   className="w-full border px-2 py-1 rounded-md text-sm"
//                   value={item.product}
//                   onChange={e => handleProductChange(index, "product", e.target.value)}
//                 >
//                   <option value="">-- Select Product --</option>
//                   {stockProducts.map(p => (
//                     <option key={p._id} value={p._id}>
//                       {p.productName} - ₦{p.price.toLocaleString()}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Quantity */}
//                 <input
//                   type="number"
//                   min="1"
//                   className="w-24 border px-2 py-1 rounded-md text-sm"
//                   placeholder="Qty"
//                   value={item.quantity}
//                   onChange={e => handleProductChange(index, "quantity", e.target.value)}
//                 />

//                 {/* Remove Button */}
//                 {products.length > 1 && (
//                   <button
//                     className="text-red-500"
//                     onClick={() => removeProduct(index)}
//                     title="Remove product"
//                   >
//                     ❌
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Add Product Button */}
//           <button
//             onClick={addProduct}
//             className="text-blue-600 text-sm underline"
//           >
//             + Add Product
//           </button>

//           {/* Total */}
//           <div className="text-right text-lg font-bold mt-4">
//             Total: ₦{totalAmount.toLocaleString()}
//           </div>

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-primary_blue text-white py-2 rounded-md font-semibold mt-4"
//           >
//             Create LPO
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateLpoModal;

import { Plus, X, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const paymentTerms = [
    "Payment On Delivery",
    "⁠Full Payment after 70% stock sold",
    "⁠Payment 2 weeks after delivery",
];

const CreateLpoModal = ({ onClose }) => {
    const { token } = useAuth();
    const VITE_API_URL = import.meta.env.VITE_BASE_URL;

    const [leads, setLeads] = useState([]);
    const [productsList, setProductsList] = useState([]);

    const [leadId, setLeadId] = useState('');
    const [terms, setTerms] = useState('');
    const [products, setProducts] = useState([{ product: '', quantity: '' }]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Fetch leads and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const leadRes = await axios.get(`${VITE_API_URL}leads?page=1&limit=5`, {
                    headers: { 's-token': token },
                });
                console.log("leadId", leadRes);
                setLeads(leadRes.data.data.leads || []);

                const prodRes = await axios.get(`${VITE_API_URL}products?limit=all`, {
                    headers: { 's-token': token },
                });
                setProductsList(prodRes.data.data.data || []);
                console.log("products", prodRes); // Log products to check data structure
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

        try {
           const res = await axios.post(`${VITE_API_URL}lpo`, payload, {
                headers: { 's-token': token },
            });
            console.log(res)
            onClose(); // Close modal on success
        } catch (err) {
            console.error(err);
        }
    };

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
                                    <option key={lead._id} value={lead._id}>{lead.name}</option>
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
                                                {item.productName} - ₦{(item.unitPrice || item.sellingPrice || 0).toLocaleString()}
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
                        <span className='text-[#484848] text-[16px] font-medium'>Total Amount</span>
                    </div>

                    <span className='w-full text-end text-[#1A1A1A] text-[20px] font-semibold'>
                        ₦{totalAmount.toLocaleString()}
                    </span>

                    {/* Submit */}
                    <button
                        type="submit"
                        className='bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]'
                    >
                        Create LPO
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLpoModal;
