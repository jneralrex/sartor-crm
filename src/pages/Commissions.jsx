import React from 'react'
import UserActionNav from '../components/UserActionNav'
import CommissionsTable from '../dataset/tables/CommissionsTable'

const Commissions = () => {
   return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Commissions</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <CommissionsTable/>
            </section>
        </>
    )
}


export default Commissions
