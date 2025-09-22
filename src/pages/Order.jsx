import React from 'react'
import UserActionNav from '../components/UserActionNav'
import OrderTable from '../dataset/tables/OrderTable'

const Order = () => {
  return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Orders</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <OrderTable/>
            </section>
        </>
    )
}

export default Order
