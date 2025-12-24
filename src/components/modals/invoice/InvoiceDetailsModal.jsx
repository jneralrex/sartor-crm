import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';
import jsPDF from 'jspdf';
import COMPANY_LOGO from '/logo.png';

const InvoiceDetailsModal = ({ onClose, invoiceId }) => {
    const token = useToken();

    const [singleInvoice, setSingleInvoice] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!invoiceId) return;

        const singleLpo = async () => {
            setLoading(true);
            try {
                const res = await instance.get(`invoice/${invoiceId}`);

                console.log(res);
                setSingleInvoice(res.data.data);

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        singleLpo();
    }, [token, invoiceId]);




    const downloadInvoicesPDF = () => {
        if (!singleInvoice) return;

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });


        const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });


        const BRAND_COLOR = [0, 82, 204];
        let y = 20;

        const drawLine = (yPos) => {
            doc.setDrawColor(220);
            doc.line(14, yPos, 196, yPos);
        };

        // ===== LOGO =====
        if (COMPANY_LOGO) {
            doc.addImage(COMPANY_LOGO, 'PNG', 14, y - 5, 30, 15);
        }

        // ===== TITLE =====
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(...BRAND_COLOR);
        doc.text('INVOICE', 150, y);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        y += 8;

        doc.text(`Invoice ID: ${singleInvoice?.invoiceId || 'N/A'}`, 150, y);
        y += 5;
        doc.text(`Status: ${singleInvoice?.status || 'N/A'}`, 150, y);

        y += 8;
        drawLine(y);
        y += 10;

        // ===== BILL TO =====
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...BRAND_COLOR);
        doc.setFontSize(12);
        doc.text('Bill To', 14, y);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        y += 6;

        doc.text(`Name: ${singleInvoice?.name || 'N/A'}`, 14, y);
        y += 5;
        doc.text(`Email: ${singleInvoice?.lead?.email || 'N/A'}`, 14, y);
        y += 5;
        doc.text(`Phone: ${singleInvoice?.lead?.phone || 'N/A'}`, 14, y);
        y += 5;
        doc.text(`Address: ${singleInvoice?.lead?.address || 'N/A'}`, 14, y);

        y += 8;
        drawLine(y);
        y += 10;

        // ===== INVOICE DETAILS =====
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...BRAND_COLOR);
        doc.text('Invoice Details', 14, y);

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        y += 6;

        doc.text(`Sales Rep: ${singleInvoice?.lead?.name || 'N/A'}`, 14, y);
        y += 5;
        doc.text(
            `Date Created: ${singleInvoice?.creationDateTime
                ? new Date(singleInvoice.creationDateTime).toLocaleDateString()
                : 'N/A'
            }`,
            14,
            y
        );
        y += 5;
        doc.text(
            `Due Date: ${singleInvoice?.dueDate
                ? new Date(singleInvoice.dueDate).toLocaleDateString()
                : 'N/A'
            }`,
            14,
            y
        );

        y += 8;
        drawLine(y);
        y += 10;

        // ===== PRODUCTS =====
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...BRAND_COLOR);
        doc.text('Products', 14, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        y += 6;

        if (Array.isArray(singleInvoice?.lpoProducts) && singleInvoice.lpoProducts.length) {
            singleInvoice.lpoProducts.forEach((item, index) => {
                if (y > 260) {
                    doc.addPage();
                    y = 20;
                }

                doc.text(
                    `${index + 1}. ${item.product?.productName || 'Unnamed Product'} — Qty: ${item.quantity}`,
                    16,
                    y
                );
                y += 6;
            });
        } else {
            doc.text('No products listed', 16, y);
            y += 6;
        }

        y += 6;
        drawLine(y);
        y += 10;

        // ===== SUMMARY =====
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...BRAND_COLOR);
        doc.text('Summary', 14, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        y += 6;

        doc.text(`Total Quantity: ${singleInvoice?.qty || 'N/A'}`, 14, y);
        y += 5;
        doc.text(`Total Amount: ${singleInvoice?.totalAmount || 'N/A'}`, 14, y);
        y += 5;
        doc.text(`Payment Terms: ${singleInvoice?.lpo?.terms || 'N/A'}`, 14, y);
        y += 5;
        doc.text(
            `Delivery Status: ${singleInvoice?.lpo?.deliveryStatus ? 'Delivered' : 'Not Delivered'
            }`,
            14,
            y
        );

        y += 20;
        drawLine(y);
        y += 15;

        // ===== SIGNATURE AREA =====
        doc.setFont('helvetica', 'normal');
        doc.text('Authorized Signature:', 14, y);
        doc.line(60, y + 1, 120, y + 1);

        doc.text(`Date: ${today}`, 140, y);


        y += 20;

        // ===== FOOTER =====
        doc.setFontSize(9);
        doc.text(
            'This invoice was generated electronically and is valid without a signature.',
            14,
            y
        );

        doc.save(`invoice-${singleInvoice?.invoiceId || Date.now()}.pdf`);
    };




    if (loading) return <DetailsSkeleton />;
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-x-hidden overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>Invoice Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-30 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            {singleInvoice?.name || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        ID

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.invoiceId || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Sales Rep

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.name || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] text-[14px]">
                        Email address

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.email || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Phone Number

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.phone || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Amount

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.totalAmount || 'NA'}

                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.creationDateTime
                                ? new Date(singleInvoice.creationDateTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Due Date

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.dueDate
                                ? new Date(singleInvoice.dueDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        LPO ID
                        <span> {singleInvoice?.lpo?._id || 'NA'}</span>

                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status

                        <span className=' text-primary_blue mt-2 cursor-pointer'>
                            {singleInvoice?.status || 'NA'}
                        </span>
                    </label>


                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Address

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.address || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Total Qty

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.qty || 'NA'}

                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Payment Terms

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lpo?.terms || 'NA'}
                        </span>
                    </label>
                </div>
                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Product(s)

                    <span className='text-[#484848] mt-2 flex flex-row items-center'>
                        <ul className='grid grid-cols-2 list-disc gap-x-10'>
                            {Array.isArray(singleInvoice.lpoProducts) && singleInvoice.lpoProducts.length > 0 ? (
                                singleInvoice.lpoProducts.map((item) => (
                                    <li key={item._id}>
                                        {item.product?.productName || 'Unnamed Product'} x {item.quantity}
                                    </li>
                                ))
                            ) : (
                                <li>No products</li>
                            )}

                        </ul>
                    </span>
                </label>
                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Delivery Status

                    {singleInvoice?.lpo?.deliveryStatus ? (
                        <span className='text-[#484848] mt-2'>
                            Delivered
                        </span>
                    ) : (
                        <span className='text-[#484848] mt-2'>
                            Not Delivered
                        </span>
                    )}
                </label>
                <div className="flex justify-between items-center mt-4 gap-3 ">
                    <button
                        onClick={downloadInvoicesPDF}
                        className="bg-primary_blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
                    >
                        Download PDF
                    </button>
                    {/* <button
                        onClick={downloadInvoicesPDF}
                        className="bg-gray-400 text-red-700 px-4 py-2 rounded-md transition w-full"
                    >
                        Cancel Invoice
                    </button> */}
                </div>

            </div>

        </div>
    )
}

export default InvoiceDetailsModal
