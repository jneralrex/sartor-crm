import React from 'react'
import UserActionNav from '../components/UserActionNav'
import StockLevelsTable from '../dataset/tables/StockLevelsTable'

const StockLevels = () => {
    return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Stock Levels</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <StockLevelsTable/>
            </section>
        </>
    )
}

export default StockLevels
