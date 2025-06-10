import React from 'react'
import UserActionNav from '../components/UserActionNav'
import InvoiceTable from '../dataset/InvoiceTable'

const Invoices = () => {
    return (
        <>
        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Invoices</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
        <section className='p-6'> 
            <InvoiceTable/>
        </section>
        </>
    )
}

export default Invoices
