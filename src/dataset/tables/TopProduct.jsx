import EmployeeSkeletonRow from '../../components/EmployeeSkeletonRow';
import { useEffect, useState } from 'react';
import instance from '../../utils/axiosInstance';



const TopProduct = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const getTopProducts = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await instance.get(`merchandiser/overview`);
            console.log("res",res.data?.data?.topProducts)
            setTopProducts(res.data?.data?.topProducts);
        } catch (error) {
            console.error("Failed to fetch task:", error);

            setError("Failed to fetch top products: " + (error.message || error.data.response.message || error.response.data.message || error.response.message || + " " + "Please try again"));
        }
    };

    useEffect(() => {
        getTopProducts();
    }, [])
    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm bg-primary_white">
                <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
                    <tr className=''>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Level</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        Array.from({ length: 3 }).map((_, idx) => <EmployeeSkeletonRow key={idx} />)
                    ) : error ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-red-500">
                                {error}
                            </td>
                        </tr>
                    ) : topProducts.length > 0 ? (
                        topProducts.map((topProduct) => (
                            <tr key={topProduct._id} className="border-b hover:bg-gray-50 text-start w-full">
                                <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]"></td>

                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <img src={topProduct.productImage} alt={topProduct.productName} className='size-12'/>
                                        <p className="text-[#484848]">{topProduct.productName}</p>
                                    </div>
                                </td>

                                <td className="px-4 py-3 text-[#767676]">{topProduct.level}</td>
                                <td className="px-4 py-3 text-[#767676]">{topProduct.price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-500">
                                No top products available.
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default TopProduct
