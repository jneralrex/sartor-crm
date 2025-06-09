import React from 'react'
import UserActionNav from '../components/UserActionNav'

const Employees = () => {
  return (
        <nav className='outlet-frame'>
            <h1 className='outlet-title'>Employees</h1>
            <div className='z-10'>        
                <UserActionNav />
            </div>
        </nav>
    )
}

export default Employees
