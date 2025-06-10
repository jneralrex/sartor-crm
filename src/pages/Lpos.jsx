import { useState } from 'react'
import UserActionNav from '../components/UserActionNav'
import LposTable from '../dataset/LposTable'

const Lpos = () => {
      const [activeTab, setActiveTab] = useState('All Employees');
    
    return (
        <>
            <nav className='outlet-frame'>
                <h1 className='outlet-title'>LPOs</h1>
                <div className='z-10'>
                    <UserActionNav />
                </div>
            </nav>
           <section className="p-6">
                <LposTable activeTab={activeTab}/>
            </section>
        </>

    )
}

export default Lpos
