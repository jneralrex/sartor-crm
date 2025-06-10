import React from 'react'
import UserActionNav from '../components/UserActionNav'
import CustomerstTable from '../dataset/CustomerstTable'

const Customers = () => {
    return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Customers</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <CustomerstTable/>
            </section>
        </>
    )
}

export default Customers
