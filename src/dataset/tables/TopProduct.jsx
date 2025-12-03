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
            console.log(res.data?.data?.topProducts)
            setTopProducts(res.data?.data?.data?.topProducts);
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
                    ) : topProducts.length > 0 ?
                        (topProducts.map((topProduct, index) => (
                            <tr key={lpo._id} className="border-b hover:bg-gray-50 text-start">
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                </td>                <td className="px-4 py-3 flex items-center gap-2 ">
                                    <div>
                                        <div className="text-[#484848] font-medium text-xs md:text-[14px] flex items-center gap-2">
                                            <img src={topProduct.productImage} alt="" />
                                            <p> {topProduct.productName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">
                                    {topProduct.level}
                                </td>
                                <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">
                                    {topProduct.price}
                                </td>
                            </tr>
                        ))
                        ) : (
                           
                                error ? (
                                    <tr>
                                    <td colSpan="7" className="text-center py-4 text-red-500">
                                        {error}
                                    </td>
                                </tr>
                                ) : (
                                    <div>
                                        <td colSpan="7" className="text-center py-4 text-red-500">
                                            No top products available.
                                    </td>
                                    </div>
                                )
                            )}
                </tbody>
            </table>
        </div>
    )
}

export default TopProduct
