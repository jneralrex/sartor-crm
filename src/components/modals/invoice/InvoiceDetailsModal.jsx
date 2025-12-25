import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useFullName, useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';
import jsPDF from 'jspdf';
import COMPANY_LOGO from '/logo.png';

const InvoiceDetailsModal = ({ onClose, invoiceId }) => {
    const token = useToken();
    const fullName = useFullName();

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
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    /* ================= CONSTANTS ================= */
    const today = new Date().toLocaleDateString("en-GB");
    const issuedBy = fullName || "N/A";
    const BRAND_COLOR = [0, 82, 204];
    let y = 20;

    const COMPANY_NAME = "Sartor Health Company Ltd";
    const ACCOUNT_NUMBER = "1017425534";
    const BANK_NAME = "Zenith Bank Nig PLC";
    const PAID_STAMP_IMAGE = null;

    const pageHeight = doc.internal.pageSize.height;

    const ensureSpace = (space = 20) => {
        if (y + space > pageHeight - 15) {
            doc.addPage();
            y = 20;
        }
    };

    /* ================= AMOUNT TO WORDS ================= */
    const numberToWords = (num) => {
        if (!num || num <= 0) return "Zero Naira Only";

        const a = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
            "Sixteen", "Seventeen", "Eighteen", "Nineteen"
        ];
        const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

        const toWords = (n) => {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
            if (n < 1000)
                return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + toWords(n % 100) : "");
            if (n < 1000000)
                return toWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + toWords(n % 1000) : "");
            return "";
        };

        const naira = Math.floor(num);
        const kobo = Math.round((num - naira) * 100);

        let words = `${toWords(naira)} Naira`;
        if (kobo > 0) words += ` and ${toWords(kobo)} Kobo`;
        return words + " Only";
    };

    /* ================= HEADER ================= */
    if (COMPANY_LOGO) {
        doc.addImage(COMPANY_LOGO, "PNG", 14, y - 5, 30, 15);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...BRAND_COLOR);
    doc.text("INVOICE", 150, y);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    y += 8;
    doc.text(`Invoice ID: ${singleInvoice?.invoiceId || "N/A"}`, 150, y);
    y += 5;
    doc.text(`Status: ${singleInvoice?.status || "N/A"}`, 150, y);
    y += 5;
    doc.text(`Issued By: ${issuedBy}`, 150, y);

    y += 10;

    /* ================= BILL TO ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...BRAND_COLOR);
    doc.text("Bill To", 14, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    doc.text(`Name: ${singleInvoice?.name || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Email: ${singleInvoice?.lead?.email || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Phone: ${singleInvoice?.lead?.phone || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Address: ${singleInvoice?.lead?.address || "N/A"}`, 14, y);

    y += 10;

    /* ================= PRODUCTS TABLE ================= */
    ensureSpace(60);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND_COLOR);
    doc.text("Products", 14, y);
    y += 6;

    // Table Header
    doc.rect(14, y, 182, 8);
    doc.line(24, y, 24, y + 8);
    doc.line(110, y, 110, y + 8);
    doc.line(140, y, 140, y + 8);

    doc.text("#", 17, y + 5);
    doc.text("Product", 30, y + 5);
    doc.text("Qty", 115, y + 5);
    doc.text("Amount", 145, y + 5);

    y += 8;
    doc.setFont("helvetica", "normal");

    let grandTotal = 0;
    let totalQty = 0;

    singleInvoice?.lpoProducts?.forEach((item, i) => {
        ensureSpace(10);

        const qty = Number(item.quantity || 0);
        const unitPrice = Number(item.unitPrice || item.product?.price || 0);
        const lineTotal = qty * unitPrice;

        totalQty += qty;
        grandTotal += lineTotal;

        doc.rect(14, y, 182, 8);
        doc.line(24, y, 24, y + 8);
        doc.line(110, y, 110, y + 8);
        doc.line(140, y, 140, y + 8);

        doc.text(String(i + 1), 17, y + 5);
        doc.text(item.product?.productName || "Product", 30, y + 5);
        doc.text(String(qty), 115, y + 5);
        doc.text(lineTotal.toLocaleString(), 145, y + 5);

        y += 8;
    });

    /* ================= SUMMARY ================= */
    ensureSpace(35);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND_COLOR);
    doc.text("Summary", 14, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    y += 6;

    doc.text(`Total Quantity: ${totalQty}`, 14, y);
    y += 5;
    doc.text(`Grand Total: ${grandTotal.toLocaleString()}`, 14, y);
    y += 5;
    doc.text(`Amount in Words: ${numberToWords(grandTotal)}`, 14, y, { maxWidth: 180 });

    y += 12;


      /* ================= PLEASE NOTE ================= */
        ensureSpace(70);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...BRAND_COLOR);
        doc.text("Please Note", 14, y);
        y += 6;

        const pleaseNoteText = `
1. Our team at Sartor try to make sure we supply our customer with quality products however, for any complaints please notify us within 3 working days of receiving our products. We do not issue return/refunds for products supplied in good conditiion.

2. Sellers and Buyers agree that Products shall sold on a 'Sales Or Return', 'Payment on Delivery', 'Payment after 2 weeks of delivery', 'Full payment after 70% stock sold' or any other agreed terms basis as stated on the LPO. Retail and Wholesale sales of Seller's Products will be evaluated by Buyer on a rolling six month basis and Buyers may elect to discountinue any Products and return the same to the Seller if, during such six month period, either sales of such Products fall below the minimum threshold in your company-owned stores or do not the meet the minimum Overall inventory Turn Rate in your company-owned stores. Invoices are due for full payment and restocking upon 70% or depletion of inventory
`;

        const noteLines = doc.splitTextToSize(pleaseNoteText.trim(), 180);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(noteLines, 14, y);
        y += noteLines.length * 5 + 5;

    /* ================= PAYMENT DETAILS ================= */
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND_COLOR);
    doc.text("Payment Details", 14, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    doc.rect(14, y, 182, 24);
    doc.line(75, y, 75, y + 24);
    doc.line(135, y, 135, y + 24);

    doc.text("Pay To", 16, y + 6);
    doc.text("Banking Details", 77, y + 6);
    doc.text("Other Details", 137, y + 6);

    doc.text(COMPANY_NAME, 16, y + 14);
    doc.text(`Acct No: ${ACCOUNT_NUMBER}`, 77, y + 14);
    doc.text(BANK_NAME, 137, y + 14);

    y += 35;

    /* ================= SIGNATURES ================= */
    ensureSpace(35);
    y += 10;

    doc.text("Manager Signature:", 14, y);
    doc.line(55, y + 1, 110, y + 1);

    doc.text("Customer Signature:", 120, y);
    doc.line(165, y + 1, 196, y + 1);

    y += 15;
    doc.text(`Date: ${today}`, 14, y);

    if (PAID_STAMP_IMAGE) {
        doc.addImage(PAID_STAMP_IMAGE, "PNG", 130, y - 30, 50, 30);
    }

    /* ================= SAVE ================= */
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
                        Download Invoice
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
