import React from 'react'
import UserActionNav from '../components/UserActionNav'
import LabelGenTable from '../dataset/LabelGenTable'

const ConvertLabelGen = () => {
     return (
        <>
        
        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Convert Label Gen</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
        <section className='p-6'>
            <LabelGenTable/>
        </section>
        </>
    )
}

export default ConvertLabelGen
