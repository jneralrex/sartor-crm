import { useState } from 'react';
import UserActionNav from '../components/UserActionNav'
import LeadsTable from '../dataset/tables/LeadsTable'

const Leads = () => {
          const [activeTab, setActiveTab] = useState('All Employees');
    
     return (
        <>
        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Leads</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
        <section className='p-6'>
        <LeadsTable activeTab={activeTab}/>
        </section>
        </>
    )
}

export default Leads
