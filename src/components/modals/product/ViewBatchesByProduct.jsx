import React, { useEffect, useState } from 'react';
import instance from '../../../utils/axiosInstance';
import { Ellipsis } from 'lucide-react';
import { Menu } from '@headlessui/react'
import ProductDetailsModal from '../labelgen/ProductDetailsModal';
import ConfirmModal from '../../ConfirmationPopUp';
import AddBatchWrapperModal from './AddBatchModal';


const ViewBatchesByProduct = ({ productId, onClose }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);




  useEffect(() => {
    if (!productId) return;

    const fetchBatches = async () => {
      try {
        const res = await instance.get(`/product/batches/${productId}`);
        console.log("batch", res)
        setBatches(res.data.data);
      } catch (err) {
        console.error('Failed to fetch batches:', err);
        toast.error("Failed to load batches");
      } finally {
        setLoading(false);
      }
    };


    fetchBatches();
  }, [productId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString();
  };

  const handleDeleteClick = (batchId) => {
    setBatchToDelete(batchId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!batchToDelete) return;
    try {
      await instance.delete(`/batch/delete/${batchToDelete}`);
      setBatches(prev => prev.filter(batch => batch._id !== batchToDelete));
      toast.success("Batch deleted successfully!");
    } catch (error) {
      console.error('Failed to delete batch:', error);
      toast.error("Failed to delete batch.");
    } finally {
      setIsConfirmOpen(false);
      setBatchToDelete(null);
    }
  };


  const handleViewDetails = (batch) => {

    setSelectedLabel((prev) => !prev);

  };

  //  const handleModalToggle = () => {
  //   setIsModalOpen((prev) => !prev);
  // };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
     <div
  className={`transition-opacity duration-300 ${
    (selectedLabel || editingBatch)
      ? 'opacity-30 pointer-events-none hidden'
      : 'opacity-100'
  }`}
>

        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-6 shadow-lg">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Batches</h2>
            <button onClick={onClose} className="text-2xl font-bold text-gray-600 hover:text-black">&times;</button>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading batches...</p>
          ) : batches.length === 0 ? (
            <p className="text-gray-500 text-sm">No batches found for this product.</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-3 border">Batch No.</th>
                  <th className="py-2 px-3 border">Qty</th>
                  <th className="py-2 px-3 border">Supply Price (₦)</th>
                  <th className="py-2 px-3 border">Selling Price (₦)</th>
                  <th className="py-2 px-3 border">Expiry Date</th>
                  <th className="py-2 px-3 border">Manufacturer</th>
                  <th className="py-2 px-3 border">Supplier</th>
                  <th className="py-2 px-3 border">Invoice</th>
                  <th className="py-2 px-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch._id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border">{batch.batchNumber}</td>
                    <td className="py-2 px-3 border">{batch.quantity}</td>
                    <td className="py-2 px-3 border">{batch.supplyPrice?.toFixed(2)}</td>
                    <td className="py-2 px-3 border">{batch.sellingPrice?.toFixed(2)}</td>
                    <td className="py-2 px-3 border">{formatDate(batch.expiryDate)}</td>
                    <td className="py-2 px-3 border">{batch.manufacturer || 'N/A'}</td>
                    <td className="py-2 px-3 border">
                      {batch.supplier?.name || 'N/A'}
                    </td>
                    <td className="py-2 px-3 border">
                      {/* <a href={batch.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View Image
                    </a> */}
                      {batch.invoiceNumber}
                    </td>
                    <td className="py-2 px-3 border">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                          <Ellipsis />
                        </Menu.Button>

                        <Menu.Items className="absolute p-2 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                 onClick={() => setEditingBatch(batch)}

                                >
                                  Edit Batch
                                </button>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                  onClick={
                                    () => {

                                      handleViewDetails(batch);
                                    }

                                  }
                                >
                                  Add Covert Label
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-red-100 text-red-700' : 'text-red-700'} group flex items-center w-full gap-2 px-4 py-2 text-sm`}
                                  onClick={() => handleDeleteClick(batch._id)}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>

                          </div>
                        </Menu.Items>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Batch"
        message="Are you sure you want to delete this batch? This action is irreversible."
      />
      {selectedLabel && (
        <ProductDetailsModal
          label={selectedLabel}
          onClose={() => setSelectedLabel(null)}
        />
      )}
{editingBatch && (
  <AddBatchWrapperModal
    productId={productId}
    onClose={() => setEditingBatch(null)}
    editData={editingBatch}
    onBatchUpdated={(updatedBatch) => {
      setBatches(prev => prev.map(batch =>
        batch._id === updatedBatch._id ? updatedBatch : batch
      ));
      setEditingBatch(null);

      setTimeout(() => {
        onClose();
      }, 3000);
    }}
  />
)}



    </div>
  );
};

export default ViewBatchesByProduct;
