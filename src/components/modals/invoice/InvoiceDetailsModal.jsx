import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useFullName, useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';
import jsPDF from 'jspdf';
import COMPANY_LOGO from '/logo.png';
// import PAID_STAMP_IMAGE from '../../../assets/images/paid.png'
import naira from "../../../assets/images/naira.png"

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
        let y = 10;

        const COMPANY_NAME = "Sartor Health Company Ltd";
        const COMPANY_ADDRESS = "A3-443, HFP Eastline Shopping Complex Abraham Adesanya Juction Lekki-Ekpe Expressway, Lagos, Nigeria";
        const COMPANY_EMAIL = "info@sartorhealth.com";
        const COMPANY_WEBSITE = "www.sartorhealth.com";
        const TIN = "22512901-0001";
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
            doc.addImage(COMPANY_LOGO, "PNG", 14, y, 30, 15);
        }

        y += 18;

        /* ================= COMPANY DETAILS ================= */
        doc.setFont("NotoSans", "bold");
        doc.setFontSize(16);
        doc.setTextColor(...BRAND_COLOR);
        doc.text(COMPANY_NAME, 14, y);
        y += 6;

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Address with line break if too long
        const addressLines = doc.splitTextToSize(COMPANY_ADDRESS, 180);
        doc.text(addressLines, 14, y);
        y += addressLines.length * 4;

        doc.text(COMPANY_EMAIL, 14, y);
        y += 4;
        doc.text(COMPANY_WEBSITE, 14, y);
        y += 4;
        doc.text(`TIN: ${TIN}`, 14, y);

        y += 8;

        doc.setFont("NotoSans", "normal");
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
        doc.setFont("NotoSans", "normal");
        doc.setFontSize(12);
        doc.setTextColor(...BRAND_COLOR);
        doc.text("Bill To", 14, y);
        y += 6;

        doc.setFont("NotoSans", "normal");
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
        ensureSpace(70);
        doc.setFont("NotoSans", "normal");
        doc.setTextColor(...BRAND_COLOR);
        doc.text("Products", 14, y);
        y += 6;

        // Table Header
        doc.rect(14, y, 182, 8);

        // Column lines
        doc.line(22, y, 22, y + 8);   // #
        doc.line(90, y, 90, y + 8);   // Product
        doc.line(110, y, 110, y + 8); // Qty
        doc.line(140, y, 140, y + 8); // Unit Price

        doc.text("#", 16, y + 5);
        doc.text("Product", 30, y + 5);
        doc.text("Qty", 95, y + 5);
        doc.text("Unit Price", 115, y + 5);
        doc.text("Amount", 150, y + 5);

        y += 8;
        doc.setFont("NotoSans", "normal");


        let grandTotal = 0;
        let totalQty = 0;

        singleInvoice?.lpoProducts?.forEach((item, i) => {
            ensureSpace(10);

            const qty = Number(item.quantity || 0);
            const unitPrice = Number(item.product?.price || 0);
            const lineTotal = qty * unitPrice;

            totalQty += qty;
            grandTotal += lineTotal;

            // Handle product name with word count check
            const productName = item.product?.productName || "Product";
            const wordCount = productName.split(/\s+/).length;
            const productNameLines = wordCount > 35 
                ? doc.splitTextToSize(productName, 65)
                : [productName];
            
            const rowHeight = Math.max(8, productNameLines.length * 4);

            doc.rect(14, y, 182, rowHeight);

            doc.line(22, y, 22, y + rowHeight);
            doc.line(90, y, 90, y + rowHeight);
            doc.line(110, y, 110, y + rowHeight);
            doc.line(140, y, 140, y + rowHeight);

            doc.text(String(i + 1), 16, y + 5);
            doc.text(productNameLines, 30, y + 5);
            doc.text(String(qty), 95, y + 5);

            /* ===== UNIT PRICE ===== */
            doc.addImage(naira, "PNG", 113, y + 2, 4, 4);
            doc.text(`     ${unitPrice.toLocaleString()}`, 115, y + 5);

            /* ===== LINE TOTAL ===== */
            doc.addImage(naira, "PNG", 148, y + 2, 4, 4);
            doc.text(`      ${lineTotal.toLocaleString()}`, 150, y + 5);

            y += rowHeight;
        });

        /* ================= SUMMARY ================= */
        ensureSpace(35);
        y += 6;

        doc.setFont("NotoSans", "normal");
        doc.setTextColor(...BRAND_COLOR);
        doc.text("Summary", 14, y);

        doc.setFont("NotoSans", "normal");
        doc.setTextColor(0, 0, 0);
        y += 6;

        doc.text(`Total Quantity: ${totalQty}`, 14, y);
        y += 5;
        doc.text("Grand Total:", 14, y);
        doc.addImage(naira, "PNG", 45, y - 3, 5, 5);
        doc.text(grandTotal.toLocaleString(), 52, y); y += 5;
        doc.text(`Amount in Words: ${numberToWords(grandTotal)}`, 14, y, { maxWidth: 180 });


        y += 12;


        /* ================= PLEASE NOTE ================= */
        ensureSpace(70);
        doc.setFont("NotoSans", "normal");
        doc.setTextColor(...BRAND_COLOR);
        doc.text("Please Note", 14, y);
        y += 6;

        const pleaseNoteText = `
1. Our team at Sartor try to make sure we supply our customer with quality products however, for any complaints please notify us within 3 working days of receiving our products. We do not issue return/refunds for products supplied in good conditiion.

2. Payment Terms: ${singleInvoice?.lpo?.terms || 'NA'}`;

        const noteLines = doc.splitTextToSize(pleaseNoteText.trim(), 180);
        doc.setFont("NotoSans", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(noteLines, 14, y);
        y += noteLines.length * 5 + 5;

        /* ================= PAYMENT DETAILS ================= */
        ensureSpace(40);
        doc.setFont("NotoSans", "normal");
        doc.setTextColor(...BRAND_COLOR);
        doc.text("Payment Details", 14, y);
        y += 6;

        doc.setFont("NotoSans", "normal");
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
                    {/* <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Unit Price

                        <ul className="text-[#484848] mt-2 list-disc ml-4">
                            {Array.isArray(singleInvoice.lpoProducts) && singleInvoice.lpoProducts.length > 0 ? (
                                singleInvoice.lpoProducts.map((item) => (
                                    <li key={item._id}>
                                        ₦{Number(item.product?.price || 0).toLocaleString()} × {item.quantity}
                                    </li>
                                ))
                            ) : (
                                <li>NA</li>
                            )}
                        </ul>
                    </label> */}

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
