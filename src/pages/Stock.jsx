import React from 'react'
import StockTable from '../dataset/tables/StockTable'
import UserActionNav from '../components/UserActionNav'

const Stock = () => {
    return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Stocks</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <StockTable/>
            </section>
        </>
    )
}
export default Stock
