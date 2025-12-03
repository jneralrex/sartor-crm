import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import instance from "../../../utils/axiosInstance";
import DetailsSkeleton from "../../DetailsSkeleton";

const StocksDetails = ({ onClose, stockId }) => {
  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stockId) return;

    const fetchStock = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`stock/${stockId}`);
        console.log("Single Stock:", res);
        setStock(res.data?.data || {});
      } catch (error) {
        console.error("Failed to fetch stock:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [stockId]);

  if (loading) return <DetailsSkeleton />;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[480px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[#1A1A1A] font-semibold text-[20px]">Stock Details</span>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="py-4 rounded-md grid grid-cols-2 gap-x-10 md:gap-x-28 gap-y-4">

          <label className="flex flex-col text-[#A3A3A3] text-[14px]">
            Product
            <span className="text-[#484848] mt-2 break-all">
              {stock?.product?.productName || stock?.product || "NA"}
            </span>
          </label>

          <label className="flex flex-col text-[#A3A3A3] text-[14px]">
            Customer
            <span className="text-[#484848] mt-2">
              {stock?.customer?.lead?.name || stock?.customer || "NA"}
            </span>
          </label>

          <label className="flex flex-col text-[#A3A3A3] text-[14px]">
            Contact Number
            <span className="text-[#484848] mt-2">
              {stock?.contactNumber || "NA"}
            </span>
          </label>

          <label className="flex flex-col text-[#A3A3A3] text-[14px]">
            Status
            <span className="text-[#484848] mt-2">
              {stock?.status || "NA"}
            </span>
          </label>

          <label className="flex flex-col text-[#A3A3A3] text-[14px]">
            Last Stock
            <span className="text-[#484848] mt-2">
              {stock?.lastStock || "NA"}
            </span>
          </label>

          <label className="flex flex-col text-[#A3A3A3] text-[14px]">
            Level
            <span className="text-[#484848] mt-2">
              {stock?.level || "NA"}
            </span>
          </label>

          <label className="flex flex-col col-span-2 text-[#A3A3A3] text-[14px]">
            Address
            <span className="text-[#484848] mt-2">
              {stock?.address || "NA"}
            </span>
          </label>

          <label className="flex flex-col col-span-2 text-[#A3A3A3] text-[14px]">
            Notes
            <span className="text-[#484848] mt-2">
              {stock?.notes || "NA"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StocksDetails;
