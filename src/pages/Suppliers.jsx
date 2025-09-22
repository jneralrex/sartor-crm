import React from 'react'
import UserActionNav from '../components/UserActionNav'
import SuppliersTable from '../dataset/tables/SuppliersTable'

const Suppliers = () => {
  return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Suppliers</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <SuppliersTable/>
            </section>
        </>
    )
}

export default Suppliers
