import React from 'react'
import UserActionNav from '../components/UserActionNav'
import MerchandisersTables from '../dataset/tables/MerchandisersTables'

const Merchandisers = () => {
 return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Merchandisers</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <MerchandisersTables/>
            </section>
        </>
    )
}

export default Merchandisers
