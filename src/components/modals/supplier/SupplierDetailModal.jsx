import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';

const SupplierDetailModal = ({ onClose, supplierId }) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supplierId) return;

    const fetchSupplier = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/supplier/${supplierId}`);
        setSupplier(res.data.data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  if (loading || !supplier) return <DetailsSkeleton />;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[500px] max-h-[600px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#1A1A1A] font-semibold text-[20px]">Supplier Details</span>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-[14px] text-[#A3A3A3]">
          <DetailItem label="Name" value={supplier.name} />
          <DetailItem label="Product" value={supplier.product} />
          <DetailItem label="Contact Name" value={supplier.contactName} />
          <DetailItem label="Contact Role" value={supplier.contactRole} />
          <DetailItem label="Contact Number" value={supplier.contactNumber || 'NA'} />
          <DetailItem label="Phone" value={supplier.phone || 'NA'} />
          <DetailItem label="Email" value={supplier.email} />
          <DetailItem label="Address" value={supplier.address} />
          <DetailItem label="Branch" value={supplier.branch} />
          <DetailItem
            label="Created"
            value={new Date(supplier.creationDateTime).toLocaleDateString()}
          />
          <DetailItem
            label="Updated"
            value={new Date(supplier.updated_at).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <label className="flex flex-col p-1">
    {label}
    <span className="text-[#484848] mt-1">{value || 'NA'}</span>
  </label>
);

export default SupplierDetailModal;
