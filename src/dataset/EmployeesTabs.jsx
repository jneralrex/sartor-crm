import React from 'react';

const tabs = ['All Employees', 'Manager', 'Sales Rep', 'Inventory Manager', 'Merchandiser', 'Admin'];

const EmployeeTabs = ({ activeTab, onTabChange }) => {  return (
    <div className="flex gap-4 lg:gap-14 mb-4 overflow-x-auto mt-[60px] md:mt-[70px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`py-2 max-w-[131px] h-[46px] whitespace-nowrap text-[16px] font-medium text-[#484848] border-b-2 transition ${
            activeTab === tab
              ? 'border-primary_blue text-primary_blue font-semibold'
              : 'border-transparent'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default EmployeeTabs;
