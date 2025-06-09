import React from 'react'
import UserActionNav from '../components/UserActionNav'

const Invoices = () => {
    return (
        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Invoices</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
    )
}

export default Invoices
