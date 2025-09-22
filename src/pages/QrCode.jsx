import React from 'react'
import QrCodeTables from '../dataset/tables/QrCodeTables'
import UserActionNav from '../components/UserActionNav'

const QrCode = () => {
    return (
        <>

        <nav className='outlet-frame'>
            <h1 className='outlet-title'>QR Code</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
            <section className='p-6'>
                <QrCodeTables/>
            </section>
        </>
    )
}

export default QrCode
