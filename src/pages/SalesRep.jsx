import React from 'react'
import UserActionNav from '../components/UserActionNav'
import SalesRepTable from '../dataset/tables/SalesRepTable'

const SalesRep = () => {
  return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Sales Rep</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <SalesRepTable/>
            </section>
        </>
    )
}

export default SalesRep
