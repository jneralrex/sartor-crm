import React from 'react'
import VehicleTable from '../dataset/tables/VehicleTable'
import UserActionNav from '../components/UserActionNav'

const Vehicle = () => {
    return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Vehicles</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <VehicleTable/>
            </section>
        </>
    )
}

export default Vehicle
