import React, { useState } from 'react';
import UserActionNav from '../components/UserActionNav';
import EmployeeTabs from '../dataset/tables/EmployeesTabs';
import EmployeeTable from '../dataset/tables/EmployeesTable';

const Employees = () => {
  const [activeTab, setActiveTab] = useState('All Employees');

  return (
    <>
      <nav className="outlet-frame">
        <h1 className="outlet-title">Employees</h1>
        <div className="z-10">
          <UserActionNav />
        </div>
      </nav>
      <section className="p-6">
        <EmployeeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <EmployeeTable activeTab={activeTab} />
      </section>
    </>
  );
};

export default Employees;
